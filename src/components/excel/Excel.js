import {$} from '@core/dom'
import { Emitter } from '../../core/Emitter';

//используем в index.js, где и вызываем метод render(), самостоятельный класс, ни от кого не наследуется.
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }
 
  //тут мы берем все компоненты и рендерим их html в див с классом excel 
  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
        emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions);
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

  destroy () {
      this.components.array.forEach(component => {
         component.destroy(); 
      });
  }
}