<template>
  <div class="signup-container">
    <h2 class="signup-form" h2>Accede a tu lista de tareas</h2>
    <form class="signup-form">
      <div>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user.js';

export default {
  name: 'SignUpView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['registerUser']),
    async handleSignUp() {
      try {
        if (this.password !== this.confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }
        const userData = {
          email: this.email,
          password: this.password,
        }
        await this.registerUser(userData.email, userData.password);
        console.log(this.user)
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
};
</script>

<style>

@import url('../assets/fonts.css');
h2 {

  font-family: 'Aniron', sans-serif;
  margin-bottom: 10%;
}
.signup-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  padding-top:-300px ;

}

.signup-form {
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Aniron', sans-serif;
}

.signup-form h2 {
  margin-bottom: 30px;
  font-size: 2rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

label {
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: bold;
}

input[type='email'],
input[type='password'],
input[type='text'] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.btn-signup {
  background-color: #0077c2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-signup:hover {
  background-color: #005faa;
}
</style>
