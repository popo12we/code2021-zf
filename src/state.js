import { isFunction } from './utils'
import { observe } from './observer/index'
function proxy (vm, source, key) {
    Object.defineProperty(vm, key, {
        get () {
            return vm[source][key]
        },
        set (newvalue) {
            newvalue = vm[source][key]
        }
    })
}
function initState (vm) {

    // 对data进行函数对象化操作
    let data = vm.$options.data
    data = vm._data = isFunction(data) ? data.call(vm) : data
    //代理对象  
    //数据劫持 可以做到访问vm._data.age相当于vm.age

    for (let key in data) {
        proxy(vm, '_data', key)
    }
    observe(data)
}
export default initState