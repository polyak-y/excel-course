import {$} from '@core/dom'

//используем в index.js, где и вызываем метод render(), самостоятельный класс, ни от кого не наследуется.
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }
 
  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    
    return $root
  }

  render() {
    //апендим весь html в корневой элемент
    this.$el.append(this.getRoot());
    //инициализируем события, init() наслеуется от ExcelComponent
    this.components.forEach(component => component.init())
  }
}