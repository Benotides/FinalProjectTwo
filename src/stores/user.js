import supabase from '../supabase'
import { defineStore } from 'pinia'

export default defineStore('userStore', {
  state: () => ({
      user: null
    
  }),
  actions: {
    async fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      this.user = user
    },
    async signIn(email, password) {
      try {
        const {
          data: { user }
        } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (user.error) throw user.error
        this.user = user
        this.$router.push('/home')
      } catch (error) {
        this.error = error.message
      }
    },
    async signUp(email, password) {
      console.log(email, password)
      try {
        const {data: {user} } = await supabase.auth.signUp({
          email,
          password
        })
        if (user.error) throw user.error
        this.user = user
      } catch (error) {
        this.error = error.message
      }
    },
    async signOut() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
      } catch (error) {
        this.error = error.message
      }
    }
  }
})
