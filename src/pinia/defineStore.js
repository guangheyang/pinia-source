import { getCurrentInstance, inject, computed, reactive } from 'vue'
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

    console.log(idOrOptions, optionsOrSetup)

    if (typeof idOrOptions === 'string') {
        id = idOrOptions
        options = optionsOrSetup
    } else {
        options = idOrOptions
        id = options.id
    }

    // 返回的函数
    function useStore() {
        const instance = getCurrentInstance() // 获取当前组件实例
        // 当前组件实例存在就注入piniaStore
        const piniaStore = instance && inject(piniaSymbol)

        if (!piniaStore._stores.has(id)) { // map中没有对应的id就需要新建
            if (typeof optionsOrSetup === 'function') {
                createSetupStore(id, optionsOrSetup, piniaStore)
            } else {
                createOptionsStore(id, options, piniaStore)
            }
        }

        return piniaStore._stores.get(id) // 获取当前id的store对象
    }

    return useStore // 使用该函数获取 store 实例对象
}

function createOptionsStore(id, options, piniaStore) {
    const { state, getters, actions } = options

    function setup() { // 处理 state, getters, actions
        piniaStore.state[id] = state ? state() : {} // 将解构的state存放到sate对象中，不存在创建一个对象

        const localState = piniaStore.state[id]

        const gettersComputed = Object.keys(getters).reduce((gettersCompute, name) => {
            gettersCompute[name] = computed(() => {
                const state = piniaStore._stores.get(id)
                return getters[name].call(state, state)
            })
            return gettersCompute
        }, {})

        return Object.assign(localState, actions, gettersComputed)
    }

    // 将setup函数完成的结果存放到_store的map对象中
    // piniaStore._stores.set(id, setup())
    createSetupStore(id, setup, piniaStore)
}

// 处理函数式传参
function createSetupStore(id, setup, piniaStore) {

    // 返回store响应式数据
    const store = reactive({})
    // 读取setup所有对象值
    const setupStore = setup()

    for (let key in setupStore) {
        const prop = setupStore[key]
        if (typeof prop === 'function') {
            // 改变函数指向
            setupStore[key] = wrapAction(prop)
        }
    }

    Object.assign(store, setupStore)
    piniaStore._stores.set(id, store)

    function wrapAction(action) {
        return function () {
            return action.apply(store, arguments)
        }
    }
}