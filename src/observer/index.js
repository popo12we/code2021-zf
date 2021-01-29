import { isObject } from '../utils.js'
import { arrayMethods } from "./array";
class Observer {
    constructor(data) {
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false // 不可枚举的
        })
        if (Array.isArray(data)) {
            // 由于性能不可能对每个数组内的元素进行劫持，
            //  但是又要知道数组的变化
            //  所以只对数组七个能改变原数组的方法进行拦截填上自己的逻辑
            data.__proto__ = arrayMethods
            // [{a:1},{b:2}] vm.arr.a=3的情况
            this.observeArray(data)
        } else {
            this.walk(data)
        }
    }
    observeArray (data) {
        data.forEach(item => observe(item))
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
    if (data.__ob__) {
        return;
    }
    if (!isObject(data)) {
        return;
    }

    return new Observer(data)
}