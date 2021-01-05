export class TableSelection {
    #className = 'selected'
 
    constructor () {
        this.group = []
        this.current = null;
    }

    //используем в методе init() в компонентах
    select($el) { //$el instanseof DOM === true
        this.clear();
        this.group.push($el)
        $el.focus().addClass(this.#className);
        this.current = $el;
    }

    // очищаем все ячейкм от класса selelcted
    clear() {
        this.group.forEach($el => $el.removeClass(this.#className));
        this.group = [];
    }

    selectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach($el => {
            $el.addClass(this.#className)
        })
    }
}