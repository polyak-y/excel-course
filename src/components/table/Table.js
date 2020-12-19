import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.fucntion';
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      name: 'Table'
    })
  }

  toHTML() {
    return createTable(20)
  }

  onClick() {
    //console.log('clikc')
  }

  onMousedown(event) {
    if(shouldResize(event)) {
        resizeHandler(this.$root, event)
    }
  }

  onMousemove(event) {
    //console.log('mousemove');
    //console.log (event.clientX);
  }

  onMouseup() {
    //console.log('mouseup');
  }
}