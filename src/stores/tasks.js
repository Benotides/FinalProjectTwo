import supabase from '@/supabase/index.js'
import { defineStore } from 'pinia'

export default defineStore('taskStore2', {
  state: () => ({
    tasksList: []
  }),

  actions: {
    async _fetchAllTasks() {
      try {
        const { data, error } = await supabase.from('tasks').select()

        if (error) {
          throw error
        }

        console.log(data)
        this.tasksList = data
      } catch (err) {
        console.error(err)
      }
    }
  },
  async _addNewTask({ title, user_id }) {
    try {
      const { data, error } = await supabase.from('tasks').insert({ title, user_id }).single()

      if (error) {
        console.error(error)
        return
      }

      console.log('New task ->', data)
      this.tasksList.push(data)
    } catch (err) {
      console.error(err)
    }
  },

  async _deleteTask(title, userId) {
    const { error } = await supabase.from('tasks').delete({ title, user_Id: userId }).eq('id', 1)

    if (error) {
      console.error(error)
      return
    }
    console.log()
  },
  async _UpdateTask(title, userId) {
    const { error } = await supabase.from('tasks').update({ title, user_Id: userId }).eq('id', 1)

    if (error) {
      console.error(error)
      return
    }
  }
})
