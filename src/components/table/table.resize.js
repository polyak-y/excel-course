import {$} from '@core/dom'

export function resizeHandler($root, event) {
    const $resizer = $(event.target); //стал инстансом класса дом Dom {$el: дом-елемент} - синяя маленькая полоска
    const $parent = $resizer.closest('[data-type="resizable"]'); //ячейка которая будет менять размер
    const coords = $parent.getCoords(); //координаты ячейки
    const type = $resizer.data.resize; //получаем тип колонки row или col
    const sideProp = type === 'col' ? 'bottom' : 'right'
    $resizer.css({opacity: 1, [sideProp]: '-5000px'});
    let value;

    document.onmousemove = e => {
        if(type === 'col') {
            const delta = Math.floor(e.pageX - coords.right); //разница между правым краем ячейки и синей полоской когды мы ее увели
            value = (coords.width + delta) + 'px';
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = Math.floor(e.pageY - coords.bottom);
            value = (coords.height + delta) + 'px';
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if(type === 'col') {
            const cells =  $root.findAll(`[data-col="${$parent.data.col}"]`); //все родственные ячейки той которую двигаем
            $parent.css({width: value});
            cells.forEach(el => el.style.width = value)
        } else {
            $parent.css({height :value});
        }
        
        $resizer.css({opacity: 0, bottom: 0, right: 0})   
    }
}