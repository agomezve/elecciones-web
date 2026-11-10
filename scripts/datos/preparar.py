# Ruta: scripts/datos/preparar.py
# Genera src/data/provincias.json a partir de las fuentes oficiales guardadas en scripts/datos/fuentes/:
#   - candidaturas.json: candidaturas proclamadas al Congreso (BOE-A-2026-23103, BOE núm. 273, 3-nov-2026).
#   - res2023.json: resultados del Congreso del 23-J de 2023 por provincia (Ministerio del Interior).
# Escaños de 2026: anexo del Real Decreto 806/2026 (BOE-A-2026-20742).
# Uso: python3 scripts/datos/preparar.py
import json, re, unicodedata
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
FUENTES = RAIZ / 'scripts/datos/fuentes'
cand = json.loads((FUENTES / 'candidaturas.json').read_text())
res = json.loads((FUENTES / 'res2023.json').read_text())

ESCANOS_2026 = {
    'Albacete': 4, 'Alicante': 12, 'Almería': 6, 'Álava': 4, 'Asturias': 7, 'Ávila': 3, 'Badajoz': 5,
    'Illes Balears': 8, 'Barcelona': 32, 'Bizkaia': 8, 'Burgos': 4, 'Cáceres': 4, 'Cádiz': 8, 'Cantabria': 5,
    'Castellón': 5, 'Ciudad Real': 5, 'Córdoba': 6, 'A Coruña': 8, 'Cuenca': 3, 'Gipuzkoa': 6, 'Girona': 6,
    'Granada': 7, 'Guadalajara': 3, 'Huelva': 5, 'Huesca': 3, 'Jaén': 5, 'León': 4, 'Lleida': 4, 'Lugo': 4,
    'Madrid': 38, 'Málaga': 11, 'Murcia': 10, 'Navarra': 5, 'Ourense': 4, 'Palencia': 3, 'Las Palmas': 8,
    'Pontevedra': 7, 'La Rioja': 4, 'Salamanca': 4, 'Santa Cruz de Tenerife': 7, 'Segovia': 3, 'Sevilla': 12,
    'Soria': 2, 'Tarragona': 6, 'Teruel': 3, 'Toledo': 6, 'Valencia': 16, 'Valladolid': 5, 'Zamora': 3,
    'Zaragoza': 7, 'Ceuta': 1, 'Melilla': 1,
}
assert sum(ESCANOS_2026.values()) == 350

# Senado (LOREG art. 165): 4 por provincia; en las islas, por isla.
SENADO = {
    'Illes Balears': [('Mallorca', 3), ('Menorca', 1), ('Ibiza', 1), ('Formentera', 1)],
    'Las Palmas': [('Gran Canaria', 3), ('Lanzarote', 1), ('Fuerteventura', 1)],
    'Santa Cruz de Tenerife': [('Tenerife', 3), ('La Palma', 1), ('La Gomera', 1), ('El Hierro', 1)],
    'Ceuta': [('Ceuta', 2)],
    'Melilla': [('Melilla', 2)],
}

COMUNIDAD = {
    'Andalucía': ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'],
    'Aragón': ['Huesca', 'Teruel', 'Zaragoza'],
    'Asturias': ['Asturias'],
    'Illes Balears': ['Illes Balears'],
    'Canarias': ['Las Palmas', 'Santa Cruz de Tenerife'],
    'Cantabria': ['Cantabria'],
    'Castilla-La Mancha': ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo'],
    'Castilla y León': ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'],
    'Cataluña': ['Barcelona', 'Girona', 'Lleida', 'Tarragona'],
    'Comunitat Valenciana': ['Alicante', 'Castellón', 'Valencia'],
    'Extremadura': ['Badajoz', 'Cáceres'],
    'Galicia': ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'],
    'Comunidad de Madrid': ['Madrid'],
    'Región de Murcia': ['Murcia'],
    'Navarra': ['Navarra'],
    'País Vasco': ['Álava', 'Bizkaia', 'Gipuzkoa'],
    'La Rioja': ['La Rioja'],
    'Ceuta': ['Ceuta'],
    'Melilla': ['Melilla'],
}
COM = {p: c for c, ps in COMUNIDAD.items() for p in ps}


def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


def limpia(s):
    return re.sub(r'\s+', ' ', s.replace('\xa0', ' ')).strip()


# Familia de cada candidatura: la ficha de partido a la que enlaza (None = sin ficha propia).
def familia(siglas, nombre):
    s = limpia(siglas).upper()
    n = limpia(nombre).upper()
    if 'PSOE' in s or s in ('PSC-PSOE) (PSC',):
        return 'psoe'
    if s == 'UPN-PP':
        return 'upn-pp'
    if s == 'PP':
        return 'pp'
    if s == 'VOX':
        return 'vox'
    if s == 'SALF':
        return 'salf'
    if n == 'PODEMOS':
        return 'podemos'
    if 'FRENTE AMPLI' in s or 'FRONT AMPLI' in s or s == 'FA' or 'FRONT AMPLI' in n:
        return 'frente-amplio'
    if s == 'ERC':
        return 'erc'
    if s == 'JXCAT':
        return 'junts'
    if 'BILDU' in s:
        return 'eh-bildu'
    if s == 'EAJ-PNV':
        return 'pnv'
    if s in ('BNG', 'B.N.G.'):
        return 'bng'
    if 'CCA' in s:
        return 'coalicion-canaria'
    if s == 'PACMA':
        return 'pacma'
    if s in ('FO', 'FRENTE OBRERO'):
        return 'frente-obrero'
    if s.startswith('PCT') or s.startswith('ELAK'):
        return 'pcte'
    return None


SIGLAS_2023 = {
    'Socialist Party of the Basque Country–Basque Country Left (PSE–EE (PSOE))': 'PSE–EE (PSOE)',
    '[[Canarian Nationalist Alternative|ANC]]–[[Unity of the People|UP]]–[[Communist Party of the Peoples of Spain|PCPC]]': 'ANC–UP–PCPC',
}
SIGLAS_LIMPIAS = {'PSC-PSOE) (PSC': 'PSC-PSOE', 'PSOE) PSE-EE (PSOE': 'PSE-EE (PSOE)', 'B.N.G.': 'BNG', 'PAZ,CASA Y TRABAJO': 'PODEMOS'}


def persona(texto):
    texto = limpia(texto)
    m = re.match(r'^(.*?)\s*\(([^()]*)\)$', texto)
    if m:
        return {'n': m.group(1), 'nota': m.group(2)}
    return {'n': texto}


def titulo(nombre):
    # Los nombres del BOE vienen a veces en mayúsculas: se dejan en mayúscula inicial salvo siglas cortas.
    nombre = limpia(nombre)
    if nombre.isupper() and len(nombre) > 6:
        menores = {'de', 'del', 'la', 'las', 'los', 'el', 'y', 'con', 'en', 'por', 'para', 'a', 'al', 'dos', 'da', 'amb', 'i'}
        palabras = nombre.lower().split(' ')
        return ' '.join(p if (i and p in menores) else p[:1].upper() + p[1:] for i, p in enumerate(palabras))
    return nombre


provincias = []
for j in cand:
    nombre = j['junta']
    r = res[nombre]
    listas = []
    for p in j['congreso']:
        s = limpia(p['siglas'])
        listas.append({
            'siglas': SIGLAS_LIMPIAS.get(s, s),
            'nombre': titulo(p['nombre']),
            'familia': familia(p['siglas'], p['nombre']),
            'candidatos': [persona(c) for c in p['candidatos']],
            'suplentes': [persona(c) for c in p['suplentes']],
        })
    escanos = ESCANOS_2026[nombre]
    for l in listas:
        if len(l['candidatos']) != escanos: print('AVISO', nombre, l['siglas'], len(l['candidatos']), escanos)
    escanos2023 = sum(x['escanos'] for x in r['partidos'])
    provincias.append({
        'slug': slug(nombre),
        'nombre': nombre,
        'comunidad': COM[nombre],
        'escanos': escanos,
        'escanos2023': escanos2023,
        'senado': [{'isla': i, 'senadores': n} for i, n in SENADO.get(nombre, [(nombre, 4)])],
        'listas': listas,
        'r2023': {
            'censo': r['censo'], 'votantes': r['votantes'], 'validos': r['validos'], 'blancos': r['blancos'],
            'nulos': r['nulos'], 'abstencion': r['abstencion'],
            'partidos': [{'siglas': SIGLAS_2023.get(x['siglas'], x['siglas']), 'votos': x['votos'], 'pct': x['pct'], 'escanos': x['escanos']} for x in r['partidos']],
        },
    })

provincias.sort(key=lambda p: slug(p['nombre']))
assert len(provincias) == 52
assert sum(p['escanos2023'] for p in provincias) == 350
(RAIZ / 'src/data').mkdir(exist_ok=True)
(RAIZ / 'src/data/provincias.json').write_text(json.dumps(provincias, ensure_ascii=False, separators=(',', ':')))
creditos = json.loads((FUENTES / 'creditos.json').read_text())
(RAIZ / 'src/data/creditos.json').write_text(json.dumps(creditos, ensure_ascii=False, indent=1))
print('provincias', len(provincias), 'listas', sum(len(p['listas']) for p in provincias))
from collections import Counter
print(Counter(l['familia'] for p in provincias for l in p['listas']))
print('cambian escaños:', [(p['nombre'], p['escanos2023'], p['escanos']) for p in provincias if p['escanos'] != p['escanos2023']])
