export class Emitter {
    constructor () {
        this.listeners = {}
    }

    //dispatch, fire, trigger
    //уведомляем слушателей если они есть
    //table.emit('table:select', {a: 1})
    emit(eventName, ...args) { //eventName - любая строчка
        if(!Array.isArray(this.listeners[eventName])) {
            return false 
        }

        this.listeners[eventName].forEach(listener => {
            listener(...args)
        });

        return true;    
    }

    //подписываемся на уведомления 
    //добавляем нового слушателя
    //formula.subscribe('table:select', () => {})
    subscribe(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn)

        return () => {
            this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn)
        }
    }
}

// const emitter = new Emitter();
// const unsub = emitter.subscribe('vladilen', data => console.log('sub', data));

// setTimeout(() => {
//     emitter.emit('vladilen', 89)
// }, 2000)

// setTimeout(() => {
//     unsub()
// }, 1000)


