import { capitalize } from '@core/utils';

//$root это уже инстанс класса Dom
export class DomListener {
  constructor($root, listeners = []) {
    if(!$root) {
      throw new Error('No root provided for DomListener')
    }
    this.$root = $root //это наш коренвой див для каждого компонента
    this.listeners = listeners;
  }

  //навешиваем события
  initDOMListeners() {
    //массив с названиями событий которые мы указывает в комопненте (Formula, Table и т.п.) в super
    this.listeners.forEach(listener => {
      const method = getMethodName(listener); //возвращает onClick, onInput и т.д. в зависимости от события которое мы указали
      if(!this[method]) {
        throw new Error(`Метод ${method} не существует в компоненте ${this.name || ''}`)
      }
      // тоже самое что и addEventListener
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method])
    })
  }

  //отменяем события
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      console.log('this', this)
      // тоже самое что и removeEventListener
      this.$root.off(listener, this[method])
    })
  }
}

//input => onInput
function getMethodName (eventName)  {
  return 'on' + capitalize(eventName);
}