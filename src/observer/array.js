let oldArrayPrototype = Array.prototype //旧的数组原型
export let arrayMethods = Object.create(oldArrayPrototype); //新原型
let methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        //这一段代码的意义 只是会了检测 arr=[{a:1}] 里面对象做响应式处理的情况
        oldArrayPrototype[method].call(this, ...args)
        let inserted;
        let ob = this.__ob__; // 根据当前数组获取到observer实例
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args; // 就是新增的内容
                break;
            case 'splice':
                inserted = args.slice(2)
            default:
                break;
        }
        if (inserted) ob.observeArray(inserted)
    }
})