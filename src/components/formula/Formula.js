import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }
  
  //возвращает какой-то html
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }
  
  //событие инпут навешено на родителя но через event мы получаем значение ребенка
  onInput(event) {
    console.log('Formula onInput', event.target.textContent)
  }

  onClick() {

  }

}