import { defineStore } from '../pinia/defineStore'
import { ref, computed } from 'vue'

export const useCountStore = defineStore('countId', () => {
    const age = ref(18)
    const name = 'yang'

    function changeAge(val) {
        age.value = val
        return age.value
    }

    const count = computed(() => age.value + 12)

    return {
        age,
        name,
        changeAge,
        count
    }
})