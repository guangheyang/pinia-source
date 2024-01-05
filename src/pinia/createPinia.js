import { piniaSymbol } from "./piniaSymbol"

export function createPinia() {
    const piniaStore = {
        _stores: new Map(), // 存放所有store对象

        state: {}, // 初始化一个state对象，后续会完成计算属性和对象的使用

        // 用于提供给use进行注册的方法，只要在use中放入了piniaStore对象，则会自动调用install方法，app实例对象
        install(app) {
            // 将当前的app实例对象进行全局化注册，有两种写法
            // 注入注册操作 provide-inject, 该操作在vue3对所有组件开发使用
            // config.globalProperties
            app.provide(piniaSymbol, piniaStore)

            app.config.globalProperties.$pinia = piniaStore

            console.log('pinia初始化完成')
        }
    }

    return piniaStore
}