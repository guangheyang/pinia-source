<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store/index'
import { useCountStore } from '../store/count'
const store = useStore()
const countStore = useCountStore()

const { name, num, doubleNum } = store

const { age, count } = countStore

const newAge = store.immediate(2)

</script>

<template>
  <h1>{{ name }}</h1>
  <h2>{{ num }}</h2>
  <h3>{{ newAge }}</h3>
  <h4>{{ doubleNum }}</h4>
  <h5>{{ age }}</h5>
  <h6>{{ count }}</h6>

  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
