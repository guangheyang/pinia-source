import {} from 'vue'
import { piniaSymbol } from './piniaSymbol'

/**
 * defineStore 的三种传参方式
 * 1. id + options
 * 2. options
 * 3. id + setup函数
 */
export function defineStore(idOrOptions, optionsOrSetup) {
    // 处理接受到的参数
    let id, options

    if (typeof idOrOptions === 'string') {
        id = idOrOptions
        options = optionsOrSetup
    } else {
        options = idOrOptions
        id = options.id
    }

    // 返回的函数
    function useStore() {
        let piniaStore = {
            ...options
        }
        return piniaStore
    }

    return useStore // 使用该函数获取 store 实例对象
}