const normalizeText = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function getProductIcon(product = {}) {
  const name = normalizeText(product.nombre);
  const category = normalizeText(product.categoria);
  const text = `${name} ${category}`;

  if (text.includes('usb') || text.includes('memoria')) return '💾';
  if (text.includes('mouse')) return '🖱️';
  if (text.includes('teclado')) return '⌨️';
  if (text.includes('cable')) return '🔌';
  if (text.includes('audifono')) return '🎧';

  if (text.includes('mochila')) return '🎒';
  if (text.includes('lapicera')) return '👝';
  if (text.includes('organizador')) return '🗂️';

  if (text.includes('impresion') || text.includes('copia')) return '🖨️';
  if (text.includes('engargolado')) return '📚';
  if (text.includes('enmicado') || text.includes('enmiacado')) return '🪪';

  if (text.includes('cuaderno') || text.includes('libreta') || text.includes('agenda')) return '📓';
  if (text.includes('lapiz')) return '✏️';
  if (text.includes('pluma') || text.includes('boligrafo')) return '🖊️';
  if (text.includes('portaminas') || text.includes('minas')) return '✒️';
  if (text.includes('colores') || text.includes('crayones') || text.includes('marcadores') || text.includes('plumones')) return '🎨';
  if (text.includes('borrador')) return '🧽';
  if (text.includes('regla') || text.includes('geometria') || text.includes('compas')) return '📐';
  if (text.includes('tijeras')) return '✂️';

  if (text.includes('pegamento') || text.includes('resistol')) return '🧴';
  if (text.includes('cinta')) return '🧻';
  if (text.includes('folder') || text.includes('carpeta') || text.includes('separadores')) return '📁';
  if (text.includes('grapas') || text.includes('clips') || text.includes('broches')) return '📎';
  if (text.includes('sobre') || text.includes('etiqueta')) return '✉️';
  if (text.includes('hojas') || text.includes('papel') || text.includes('cartulina')) return '📄';

  if (category.includes('tecnologia')) return '💻';
  if (category.includes('arte')) return '🎨';
  if (category.includes('oficina')) return '🗃️';
  if (category.includes('impresion')) return '🖨️';
  if (category.includes('utiles')) return '📚';

  return '📦';
}