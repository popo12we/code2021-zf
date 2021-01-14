import { isObject } from '../utils.js'
class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk (data) {//data对象里所有的属性进行一个个的劫持
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
}

function defineReactive (data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get () {
            return value
        },
        set (newV) {
            //防止vm._data.a={b:1}的情况
            observe(newV)
            value = newV
        }
    })
}
export function observe (data) {
    if (!isObject(data)) {
        return;
    }

    return new Observer(data)
}