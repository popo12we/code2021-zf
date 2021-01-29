import initState from './state'
import { compileToFunction} from './compiler/index'
export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options//绑定options
        initState(vm) //真正的初始化
        //初始化完成之后 进行模板编译
        // 1.有没有写render函数 
        // 2.有没有写template模板
        // 3.没有就拿el的outerHTML当做模板

        // 模板就是一个渲染函数
        if (vm.$options.el) {
           
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this
        //只考虑没render和没template的情况
        if (!vm.$options.render) {
           
            let template = vm.$options.template
            
            if (!template && vm.$options.el) {
                console.log(vm.el)
                el=document.querySelector(el)
                template=el.outerHTML
                console.log(template)
                vm.$el = el
                let render = compileToFunction(template)
                options.render = render
            }
        }
    }
}