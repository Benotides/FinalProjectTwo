<template>
<div class="signup-container">
    <form class="signup-form" @submit.prevent="signUp(email, password)">
        <h2>Regístrate</h2>
        <div class="input-container">
            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-container">
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn-signup">Regístrate</button>
    </form>
</div>
</template>

  
<script>
import user from "../stores/user";

export default {
    data() {
        return {
            email: "",
            password: "",
        };


    },
    methods: {
    async signUp(email, password) {
      try {
        const { user, error } = await user.signUp(email, password);
        if (error) throw error;
        this.user = user;
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

  
<style>
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
}

.signup-form {
    background-color: #fff;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
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

input[type="email"],
input[type="password"] {
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
