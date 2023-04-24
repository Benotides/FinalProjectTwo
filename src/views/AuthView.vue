<template>
<div>
    <h1>Inicio de sesión</h1>
    <router-link to="/auth/signup">Registrarse</router-link> 

    <RouterView/>
</div>
</template>

<script>
import { RouterView } from 'vue-router';


export default {
    name: "AuthView",
    components: {
        RouterView,
    }
};
</script>
