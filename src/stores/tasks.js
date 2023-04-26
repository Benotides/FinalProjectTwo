import { defineStore } from 'pinia'
import supabase from '../supabase'

export default defineStore('tasks', {
  state() {
    return {
      tasksList: []
    }
  },

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
  async _addNewTask(title, userId) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title, user_id: userId })
        .single();
  
      if (error) {
        console.error(error);
        return;
      }
  
      console.log('New task ->', data);
      this.tasksList.push(data);
    } catch (err) {
      console.error(err);
    }
  },

  async deleteTask(title, userId) {
    const { error } = await supabase
      .from('countries')
      .delete({ title, user_Id: userId })
      .eq('id', 1)

    if (error) {
      console.error(error)
      return
    }
    console.log()
  }
})
