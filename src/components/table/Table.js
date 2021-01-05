import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.fucntion';
import { isCell } from './table.fucntion';
import { TableSelection } from './TableSelection';
import { $ } from '../../core/dom';
import { range } from '../../core/utils';
import { nextSelector } from './table.fucntion';
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
        name: 'Table',
        listeners: ['mousedown', 'keydown', 'input'],
        ...options
    })
  }

  toHTML() {
    return createTable(20)
  }

  //нажатие на левую клавишу мыши
  onMousedown(event) {
    if(shouldResize(event)) { //если ячека имеет data-resize
        //логика по ресайзу таблицы
        resizeHandler(this.$root, event)
    } else if(isCell(event)) { //если у ячейки data-type='cell'

        const $target = $(event.target);

        if(event.shiftKey) { //если зажали шифт выделяем группу
            //curent - выделенная
            const current = this.selection.current.id(true);
            //target - ту на котору нажали с шифтом
            const target = $target.id(true); //если передаем true, то координаты получаем в виде объекта с координами {row: 1, col: 0}
            const cols = range(current.col, target.col)
            const rows = range(current.row, target.row)
           
            const ids = cols.reduce((sum, col) => {
                rows.forEach(row => sum.push(`${row}:${col}`))
                return sum;
            }, [])

            const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
            this.selection.selectGroup($cells)
        } else { //иначе выделяем одну
            this.selection.select($target)
        }
    }  
  }

  //Вызывается в прототипе ExcelComponent в конструкторе, то есть сразу
  prepare() { 
    this.selection = new TableSelection();
  }

  //отрабатыает при инициализации компонента в Excel.js
  init() {
      //вызываем init из ExcelComponent чтобы не пропало навешивание события 
      super.init();
      const $cell = this.$root.find('[data-id="0:0"]');
      //выделаем одну ячейку
      this.selection.select($cell)   
      this.$emit('table:select', $cell) 
      
      //в ExcelComponent мы реализовали emmit.subscribe через метод $on, то есть кладем функцию в массив, а через emit ее вызываем
      this.$on('formula:input', (text) => {
          this.selection.current.text(text)
      })

      this.$on('formula:done', () => {
          this.selection.current.focus();
      })
  }
  
  //нажатие на клавиши клавиатуры
  onKeydown(event) {
      const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
      const { key } = event;

      if(keys.includes(key) && !event.shiftKey) {
        event.preventDefault();
        
        const id = this.selection.current.id(true)
        const $next = this.$root.find(nextSelector(key, id))
        this.selection.select($next);
        this.$emit('table:select', $next)
      }
  }

  onInput(event) {
      this.$emit('table:input', $(event.target))
  }
}
