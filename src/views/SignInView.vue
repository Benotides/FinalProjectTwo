<template>
  <div class="container">
    <h1>Accede a tu lista de tareas</h1>
    <form class="signin-form">
      <label for="email">Email</label>
      <input class="signin-form-input" type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input class="signin-form-input" type="password" id="password" v-model="password" />
      <button class="signin-form-button" type="button" @click.prevent="_handleSignIn">
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user.js'

export default {
  name: 'SignInView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    async _handleSignIn() {
      try {
        const userData = {
          email: this.email,
          password: this.password
        }
        await this.signIn(userData)
        this.$router.push({
          name: 'home'
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

h1 {
  font-family: 'Aniron', sans-serif;
  margin-top: -50%;
}
label {
  color:rgb(228, 165, 88);
  margin-bottom: 3%;
}
.signin-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  font-family: 'Aniron', sans-serif;
}

.signin-form-input {
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  font-family: 'Aniron', sans-serif;
  background-color: darkslategrey;
}

.signin-form-button {
  background-color: darkslategrey;
  color:rgb(228, 165, 88);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.signin-form-button:hover {
  background-color: #8e9194;
}

/* Estilos para pantalla de tablet */
@media screen and (max-width: 991px) {
  .signin-form-input {
    width: 250px;
  }

}

/* Estilos para pantalla de móvil */
@media screen and (max-width: 767px) {
  .signin-form-input {
    width: auto;
  }
}
@media screen and (max-width: 400px) {
h1 {
  font-size: 20px;


  text-align: center;
}
}
</style>
