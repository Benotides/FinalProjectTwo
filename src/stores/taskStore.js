import supabase from '@/supabase/index.js'
import { defineStore } from 'pinia'

export default defineStore('taskStore', {
  state: () => ({
    tasksList: []
  }),
  actions: {
    async _addNewTask({title, user_id}) {
        try {
            const { data, error } = await supabase
            .from('tasks')
            .insert({ title, user_id })
            .select()
      
            if (error) {
              console.error(error)
              return
            }
      
            console.log('New task ->', data[0])
            this.tasksList.push(data[0])
          } catch (err) {
            console.error(err)
          }
    }

  },
})
