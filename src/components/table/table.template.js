const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `<div class="cell" contenteditable></div>`
};

function createCol(col) {
  return `
    <div class="column">${col}</div>
  `
};

function createRow(content, i = '') {
  return `
    <div class="row">
      <div class="row-info">${i}</div>
      <div class="row-data">${content}</div>
    </div>
  `
};

function multiCell (content, count) {
  return Array.from({length: count}, (_) => content).join('')
}

export function createTable (rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = Array.from({length: colsCount}, (_, ind) => String.fromCharCode(CODES.A + ind))
                    .map(createCol).join('');

  rows.push(createRow(cols));

  for(let i = 0; i < rowsCount; i++) {
    const content = multiCell(createCell(), colsCount)
    rows.push(createRow(content, i + 1));
  }

  return rows.join('')
}