// Ruta: src/scripts/dias.ts
// Recalcula en el navegador los «faltan N días» que el build deja escritos. El despliegue diario
// puede salir con horas de retraso, y sin esto la cifra iría un día por detrás desde medianoche.
// Uso: <span data-dias="2026-11-29" data-limite="2026-11-29T20:00:00+01:00" data-forma="faltan|quedan">…</span>
const hoyMadrid = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
const dias = (iso: string) =>
  Math.round((Date.parse(`${iso.slice(0, 10)}T00:00:00Z`) - Date.parse(`${hoyMadrid()}T00:00:00Z`)) / 86_400_000);

export function texto(d: number, forma: string) {
  if (forma === 'quedan') return d === 0 ? 'Hoy es el último día →' : `Te ${d === 1 ? 'queda 1 día' : `quedan ${d} días`} →`;
  return d === 0 ? 'hoy' : d === 1 ? 'falta 1 día' : `faltan ${d} días`;
}

for (const el of document.querySelectorAll<HTMLElement>('[data-dias]')) {
  const d = dias(el.dataset.dias!);
  const pasado = d < 0 || (el.dataset.limite ? Date.parse(el.dataset.limite) < Date.now() : false);
  if (pasado) {
    el.hidden = true;
    el.closest<HTMLElement>('[data-hito]')?.classList.add('opacity-60');
    continue;
  }
  el.hidden = false;
  el.textContent = texto(d, el.dataset.forma ?? 'faltan');
  if (d === 0 && el.dataset.forma !== 'quedan') el.classList.replace('bg-indigo-50', 'bg-amber-100');
}
