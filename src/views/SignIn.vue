<template>
<form class="signin-form" @submit.prevent="signIn">
    <input class="signin-form-input" type="email" v-model="email" placeholder="Email" />
    <input class="signin-form-input" type="password" v-model="password" placeholder="Password" />
    <button class="signin-form-button" type="submit">Sign In</button>
</form>
</template>

  
<script>
import user from '@/stores/user'

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async signIn() {
            await user.signIn(this.email, this.password)
            if (user.error) {
                console.log(user.error)
            } else {
                this.$router.push('/')
            }
        },
    },
}
</script>

  
<style>
.signin-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

.signin-form-input {
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.signin-form-button {
    background-color: #0077c2;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.signin-form-button:hover {
    background-color: #005faa;
}
</style>
