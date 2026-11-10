# Ruta: scripts/datos/senado.py
# Genera src/data/senado.json con las candidaturas al Senado proclamadas en el BOE-A-2026-23103 (BOE núm. 273, 3-nov-2026).
# Uso: python3 scripts/datos/senado.py <texto-del-boe.txt>   (el texto plano de boe.es/diario_boe/txt.php?id=BOE-A-2026-23103)
import json, re, sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
PROV = json.loads((RAIZ / 'src/data/provincias.json').read_text())
JUNTAS = [c['junta'] for c in json.loads((RAIZ / 'scripts/datos/fuentes/candidaturas.json').read_text())]
lineas = [l.replace('\xa0', ' ').replace(' ', ' ').strip() for l in Path(sys.argv[1]).read_text().split('\n')]


def separa(texto):
    """'NOMBRE (SIGLAS (A-B))' → ('NOMBRE', 'SIGLAS (A-B)'), respetando paréntesis anidados."""
    texto = re.sub(r'\s*\[.*\]$', '', texto.rstrip('.').strip()).rstrip('.').strip()
    if not texto.endswith(')'):
        return texto, None
    nivel = 0
    for i in range(len(texto) - 1, -1, -1):
        if texto[i] == ')':
            nivel += 1
        elif texto[i] == '(':
            nivel -= 1
            if nivel == 0:
                return texto[:i].strip(), texto[i + 1:-1].strip()
    return texto, None


def persona(texto):
    nombre, nota = separa(texto)
    p = {'n': nombre}
    if nota:
        p['nota'] = nota
    return p


def mayusculas(texto):
    """Las candidaturas suelen ir en mayúsculas; los candidatos, con iniciales."""
    letras = [c for c in re.sub(r'\(.*', '', texto) if c.isalpha()] or [c for c in texto if c.isalpha()]
    return bool(letras) and sum(c.isupper() for c in letras) / len(letras) > 0.6


def es_lista(texto, siguiente):
    """También es candidatura si lo que viene detrás vuelve a numerar desde 1 (nombres en minúsculas)."""
    return mayusculas(texto) or bool(re.match(r'1\.\s', siguiente)) or siguiente == 'No proclamada.'


# Une «1.» + nombre en una sola línea para tratar igual los dos formatos del BOE.
unidas, i = [], 0
while i < len(lineas):
    l = lineas[i]
    if re.fullmatch(r'\d+\.', l) and i + 1 < len(lineas):
        l = f'{l} {lineas[i + 1]}'
        i += 1
    unidas.append(l)
    i += 1

salida, junta, seccion, circ, lista, cand, avisos = {}, None, None, None, None, None, []
rechazadas = []
pendientes = 0  # suplentes que faltan por leer tras una cabecera «Suplentes:»
partiendo = False  # la línea anterior era un nombre de candidatura que puede seguir en la siguiente
for pos, l in enumerate(unidas):
    siguiente = unidas[pos + 1] if pos + 1 < len(unidas) else ''
    m = re.search(r'Junta Electoral Provincial de ([^\n,]+)', l, re.I)
    if m:
        nombre = next((j for j in JUNTAS if m.group(1).startswith(j)), None)
        if nombre:
            junta, seccion, circ, lista, cand, pendientes, partiendo = nombre, None, None, None, None, 0, False
    if l == 'SENADO':
        if seccion == 'senado' and circ and not circ['listas']:
            continue  # título repetido
        seccion = 'senado'
        circ = {'isla': None, 'listas': []}
        salida.setdefault(junta, []).append(circ)
        lista = cand = None
        pendientes, partiendo = 0, False
        continue
    if l == 'CONGRESO' or l.startswith('CONGRESO DE LOS'):
        seccion = 'congreso'
    if seccion != 'senado' or not l:
        continue
    m = re.match(r'Circunscripción electoral: (.+)$', l)
    if m:
        if circ['listas'] or circ['isla']:
            circ = {'isla': m.group(1).strip(), 'listas': []}
            salida[junta].append(circ)
        else:
            circ['isla'] = m.group(1).strip()
        lista = cand = None
        pendientes, partiendo = 0, False
        continue
    m = re.match(r'Suplente (\d+): (.+)$', l)
    if m and cand is not None:
        cand['suplentes'].append(persona(m.group(2)))
        partiendo = False
        continue
    if re.fullmatch(r'Suplentes?:', l):
        partiendo = False
        pendientes = 2 * sum(1 for c in lista['candidatos'] if not c['suplentes'])
        continue
    m = re.match(r'(\d+)\.\s*(.+)$', l)
    if m:
        texto = m.group(2)
        partiendo = False
        if es_lista(texto, siguiente):
            nombre, siglas = separa(texto)
            lista = {'nombre': texto.rstrip('.').strip(), 'siglas': siglas or nombre, 'candidatos': []}
            circ['listas'].append(lista)
            cand, pendientes, partiendo = None, 0, True
        elif pendientes:
            sin_completar = next(c for c in lista['candidatos'] if len(c['suplentes']) < 2)
            sin_completar['suplentes'].append(persona(texto))
            pendientes -= 1
        elif lista is None:
            avisos.append(f'candidato sin lista en {junta}: {l}')
        else:
            cand = {**persona(texto), 'suplentes': []}
            lista['candidatos'].append(cand)
        continue
    if l == 'No proclamada.' and lista is not None:
        circ['listas'].remove(lista)
        rechazadas.append(f'{junta}: {lista["nombre"]}')
        lista, partiendo = None, False
        continue
    if re.fullmatch(r'Titular(es)?:', l):
        partiendo = False
        continue
    abiertos = lista['nombre'].count('(') - lista['nombre'].count(')') if lista and partiendo else 0
    if partiendo and not l.startswith('JUNTA') and (abiertos > 0 or (mayusculas(l) and l.startswith('('))):
        lista['nombre'] += (' ' if l.startswith('(') else '') + l
        continue
    if lista is not None and siguiente.startswith('Suplente 1:'):
        # Valladolid: candidatos sin número.
        cand = {**persona(l), 'suplentes': []}
        lista['candidatos'].append(cand)
        partiendo = False
        continue
    if l.startswith('JUNTA ELECTORAL') or l.startswith('CONGRESO'):
        seccion = None
        continue
    avisos.append(f'cierre en {junta}: {l[:70]}')
    seccion = None

for circs in salida.values():
    for c in circs:
        if c['isla'] == 'Eivissa':
            c['isla'] = 'Ibiza'
        for li in c['listas']:
            li['nombre'] = li['nombre'].replace('ERC-EHBILDU', 'ERC-EH BILDU')
            li['nombre'], siglas = separa(li['nombre'])
            li['siglas'] = siglas or li['nombre']

por_slug = {}
for p in PROV:
    j = next(x for x in JUNTAS if x.lower() in (p['nombre'].lower(),) or x == p['nombre'])
    por_slug[p['slug']] = salida.get(j, [])
(RAIZ / 'src/data/senado.json').write_text(json.dumps(por_slug, ensure_ascii=False, indent=0))
for r in rechazadas:
    print('NO PROCLAMADA', r)
for a in avisos:
    print('AVISO', a)
print(len(por_slug), 'provincias;', sum(len(l['candidatos']) for c in por_slug.values() for x in c for l in x['listas']), 'candidatos')
