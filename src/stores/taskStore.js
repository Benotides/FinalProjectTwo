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
    },
    async _fetchAllTasks() {
      try {
        const { data, error } = await supabase
        .from('tasks')
        .select()

        if (error) {
          throw error
        }

        console.log(data)
        this.tasksList = data
      } catch (err) {
        console.error(err)
      }
    },

    async _deleteTask(title, userId) {
      const { error } = await supabase
      .from('tasks')
      .delete({ title, user_Id: userId })
      .eq('id')
  
      if (error) {
        console.error(error)
        return
      }
      console.log()
    },

    async _UpdateTask(title, userId) {
      const { error } = await supabase
      .from('tasks')
      .update({ title, user_Id: userId }).eq('id')
  
      if (error) {
        console.error(error)
        return
      }
    },
    

  },
})


//ir peganod poco a poco todo este código en el nuevo documento y luego codificar el html para que se vaya pintando mi lista de tareas en la pantalla. Luego ver tambien porque sign up ya no me funciona. 