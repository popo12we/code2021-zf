import initState from './state'
export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options//绑定options
        initState(vm) //真正的初始化
    }
}