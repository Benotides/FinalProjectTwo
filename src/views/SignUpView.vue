<template>
  <h2>Regístrate como nuevo usuario</h2>
  <form class="signup-form">
    <div class="box">
      <label for="email">Email:</label>
      <input class="input-container" type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input class="input-container" type="password" id="password" v-model="password" required />
    </div>
    <div>
      <label for="confirm-password">Confirm Password:</label>
      <input
        class="input-container"
        type="password"
        id="confirm-password"
        v-model="confirmPassword"
        required
      />
    </div>
    <button class="btn-signup" @click="handleSignUp" type="button">Register</button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user.js'

export default {
  name: 'SignUpView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['registerUser']),
    async handleSignUp() {
      try {
        if (this.password !== this.confirmPassword) {
          throw new Error('Las contraseñas no coinciden')
        }
        const userData = {
          email: this.email,
          password: this.password
        }
        await this.registerUser(userData.email, userData.password)
        console.log(this.user)
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

.signup-form {
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 30px 40px rgba(83, 15, 15, 0.2);
  text-align: center;
  font-family: 'Aniron', sans-serif;
  margin-bottom: 9%;
}

h2 {
  margin-top: 0%;
  margin-bottom: 5%;
  font-size: 2rem;
  text-align: center;
  font-family: 'Aniron', sans-serif;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

label {
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(199, 132, 51);
}

input[type='email'],
input[type='password'],
input[type='text'] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-top: 2%;
}

.btn-signup {
  font-family: 'Aniron', sans-serif;
  background-color: darkslategrey;
  color: rgb(199, 132, 51);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 20px;
}

.btn-signup:hover {
  background-color: #8e9194;
}

@media screen and (max-width: 480px) {
  h2 {
    margin-bottom: 30px;
    font-size: 25px;
    text-align: center;
    font-family: 'Aniron', sans-serif;
  }
  label {
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: bold;
    color: rgb(199, 132, 51);
  }
}
</style>
