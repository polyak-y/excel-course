import { DomListener } from "@core/DomListener";

//является прототипом для Excel,Formula,Table,Header
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners) //перезаписываем как бы данные 
    this.name = options.name || '';
    this.emitter = options.emitter;
    //this.$root = $root
    //this.listener = options.listener
    this.prepare()
    this.unsubscribers = []
  }

  //настраиваем наш компонент до init
  prepare() {}

  //возвращает шаблон компонента
  toHTML() {
    return '' 
  }

  //ининциализируем компонент и добавляем дом слушателя
  init() {
    //наследуется от DomListener
    this.initDOMListeners() //навешивает события на корневые элементы
  }  
  
  //уведомляем слушателей про события
  $emit(eventName, ...arg) {
    this.emitter.emit(eventName, ...arg)
  }

  //подписываемся на событие eventName
  $on(eventName, fn) {
      const unsub = this.emitter.subscribe(eventName, fn);
      this.unsubscribers.push(unsub)
  }

  //удаляем компонент и чистим слушатели
  destroy() {
    //наследуется от DomListener
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub());
  }
} 