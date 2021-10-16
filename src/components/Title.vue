<script setup>
import { ref } from "vue";
import useTodos from "../composables/useTodos";

const { addTodo } = useTodos();

const newTodo = ref("");
const add = () => {
  if (newTodo.value) {
    addTodo(newTodo.value);
    newTodo.value = "";
  }
};
</script>

<template>
  <h1 class="pb-4 text-6xl font-thin tracking-tight text-center text-gray-300">
    🚀 My Todo App
  </h1>
  <input
    @change="add"
    v-model="newTodo"
    type="text"
    class="px-4 py-2 text-xl text-center rounded-lg"
    placeholder="New Todo"
  />
</template>
