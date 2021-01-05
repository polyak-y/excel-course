const CODES = {
  A: 65,
  Z: 90
}

function createCell(ind, rowNum) {
  return `<div class="cell" contenteditable data-type="cell" data-col="${ind}" data-id="${rowNum}:${ind}"></div>`
};

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
};

function createRow(content, i = '') {
    const resize = i ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
        <div class="row-info">${i} ${resize}</div>
        <div class="row-data">${content}</div>
        </div>
  `
};

function multiCell (createCell, colsCount, rowNum) {
  return Array.from({length: colsCount}, (_, ind) => createCell(ind, rowNum)).join('')
}

export function createTable (rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = Array.from({length: colsCount}, (_, ind) => String.fromCharCode(CODES.A + ind))
                    .map(createCol).join('');
  rows.push(createRow(cols)); //создали первую строку где ABCDE 

  for(let i = 0; i < rowsCount; i++) {
    const content = multiCell(createCell, colsCount, i)
    rows.push(createRow(content, i + 1));
  }

  return rows.join('')
}