import { DomListener } from "@core/DomListener";

//является прототипом для Excel,Formula,Table,Header
export class ExcelComponent extends DomListener {
  constructor($root, options ={}) {
    super($root, options.listeners) //перезаписываем как бы данные 
    //this.$root = $root
    //this.listener = options.listener
    this.name = options.name
  } 

  //возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    //наследуется от DomListener
    this.initDOMListeners()
  }

  destroy() {
    //наследуется от DomListener
    this.removeDOMListeners()
  }
} 