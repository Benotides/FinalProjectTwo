import supabase from '../supabase'

const user = {
  data() {
    return {
      user: null,
      error: null,
    }
  },
  methods: {
    async signIn(email, password) {
      try {
        const { user, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        this.user = user
      } catch (error) {
        this.error = error.message
      }
    },
    async signUp(email, password) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email,
          password
        })
        if (error) throw error
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
    },
  },
}

export default user
