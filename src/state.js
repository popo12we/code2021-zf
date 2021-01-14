import { isFunction } from './utils'
import { observe } from './observer/index'
function initState (vm) {

    // 对data进行函数对象化操作
    let data = vm.$options.data
    data = vm._data = isFunction(data) ? data.call(vm) : data
    //数据劫持
    observe(data)
}
export default initState