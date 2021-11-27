import { ref, computed } from 'vue'
import axios from 'axios'

const todos = ref([])

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    username: import.meta.env.VITE_API_USERNAME,
    password: import.meta.env.VITE_API_PASSWORD,
  },
})

const useTodos = () => {
  const getAll = async () => {
    const { data } = await api.get()
    todos.value = data
  }

  const pending = computed(() => {
    return todos.value.filter(todo => !todo.completed)
  })

  const completed = computed(() => {
    return todos.value.filter(todo => todo.completed)
  })

  const addTodo = async newTodo => {
    if (newTodo.trim()) {
      await api.post('', {
        text: newTodo,
        completed: false,
      })
      await getAll()
    }
  }

  const changeStatus = async id => {
    const todo = todos.value.find(todo => todo.id === id)
    todo.completed = !todo.completed
    const { id: _id, ...todoToUpdate } = todo
    await api.put(`/${id}`, todoToUpdate)
    await getAll()
  }

  getAll()

  return {
    todos,
    pending,
    completed,
    addTodo,
    changeStatus,
  }
}

export default useTodos
