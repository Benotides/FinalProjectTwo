<template>
<RouterLink to="/auth">Vuelve a iniciar sesión</RouterLink>
<div class="signup-container">
    <form class="signup-form" @submit.prevent="handleSignUp(email, password, confirmPassword)">
        <h2>Regístrate</h2>
        <div class="input-container">
            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-container">
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" required />
        </div>
        <div class="input-container">
            <label for="confirmPassword">Confirmar Contraseña:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <div class="input-container">
            <label for="buttonName">Nombre</label>
            <input type="text" id="buttonName" v-model="buttonName" required />
        </div>
        <button type="submit" class="btn-signup">SignUp</button>
    </form>

</div>
</template>

<script>
import {
    mapActions
} from 'pinia';
import userStore from '@/stores/user';

export default {
    methods: {
        ...mapActions(userStore, ['signUp']),
        async handleSignUp(email, password, confirmPassword) {
            console.log(email, password, confirmPassword)
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            await this.signUp(email, password)
            this.$router.push('/home')
        }
    }
}
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
input[type="password"],
input[type="text"] {
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
