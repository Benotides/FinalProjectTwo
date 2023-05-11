<template>
  <div>
    <button class="signout" @click.prevent="_handleLogOut">Log Out</button>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import userStore from '@/stores/user.js'
import taskStore from '@/stores/taskStore.js'

export default {
  name: 'LogOut',

  methods: {
    ...mapActions(userStore, ['signOut']),
    ...mapActions(taskStore, ['_removeAllTasks']),
    async _handleLogOut() {
      try {
        await this.signOut()
        this._removeAllTasks()
        this.$router.push({
          name: 'signIn'
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
@import url('../assets/fonts.css');
.signout {
  font-family: 'Aniron', sans-serif;
  margin-top: 1rem;
  background-color: #a97f50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 60%;
  margin-bottom: 8%;
  width: auto;
  height: auto;
}
button:hover {
  background-color: rgb(73, 43, 9);
}

@media (max-width: 480px) {
  .signout {
    margin-top: 1rem;
    background-color: #a97f50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 65%;
    margin-bottom: 8%;
    width: auto;
    font-size: 10px;
  }
}

@media (min-width: 481px) and (max-width: 1023px) {
  .signout {
    margin-left: 60%;
    margin-bottom: 8%;
    width: auto;
  }
}
</style>
