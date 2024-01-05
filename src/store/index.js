import { defineStore } from '../pinia/index'

export const useStore = defineStore('storeId', {
    state: ()=> {
        return {
            name: 'yang',
            num: 18
        }
    },
    actions: {
        immediate(num) {
            return this.num + num
        }
    },
    getters: {
        doubleNum: (state) => state.num * 2,
        showNum: state => state.num + 1
    }
})