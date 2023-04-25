<template>
<div>
    <h1>Inicio de sesión</h1>

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
