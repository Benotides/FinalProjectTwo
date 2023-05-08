<script>
import NavBar from '../src/components/NavBar.vue'
export default {
    name: "App",
    components: {
        NavBar,
    },
    data() {
        return {}
    },
}
</script>

<template>
<NavBar />
<header class="container">
    <img class="logo" src="../src/assets/images/Este es el logo de Tolkien .jpeg" alt="Logo de Tolkien">
    <div class="wrapper">

    </div>
</header>
<RouterView />
</template>

<style scoped>
body {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 400;
    
  
}

.logo {
    display: block;
    margin: 0 auto;
    width: 300px;
    height: 300px;
    object-fit: contain;
    object-position: center;
    border-radius: 50%;
    border: 2px solid #333;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
    padding-bottom: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

/* Estilos para pantalla de tablet */
@media screen and (max-width: 991px) {
    .logo {
        width: 200px;
        height: 200px;
    }

    nav {
        font-size: 10px;
    }
}

/* Estilos para pantalla de móvil */
@media screen and (max-width: 767px) {
    .logo {
        width: 150px;
        height: 150px;
    }

    nav {
        font-size: 8px;
    }

    nav a {
        padding: 0 0.5rem;
    }
}

/* Estilos para pantalla de PC */
@media screen and (min-width: 1600px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        /* place-items: flex-start; */
        flex-wrap: wrap;
    }

    nav {
        text-align: center;
        /* margin-left: -1rem; */
        font-size: 1rem;

        /* padding: 1rem 0;
        margin-top: 1rem; */
    }
}
</style>
