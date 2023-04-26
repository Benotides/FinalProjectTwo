<script>
import {
    RouterLink,
    RouterView
} from 'vue-router'
import {
    mapActions
} from 'pinia';
import {
    defineStore
} from 'pinia';
import tasks from './stores/tasks';
// import tasks from './stores/user';


export default {
    name: 'App',
    components: {
        RouterView,
        RouterLink,
        
    },
    methods: {
    ...mapActions(defineStore(tasks), ['fetchUser', 'fetchAllTasks']),
    
  },
  async created() {
    await this.fetchUser()
    await this.fetchAllTasks()
  },
}
</script>









<template>
<header>
    <div class="container">
        <img class="logo" src="../src/assets/Este es el logo de Tolkien (1).jpg" alt="Logo de Tolkien">
    </div>

    <div class="wrapper">

        <nav>

            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/auth/SignUp">Registrate</RouterLink>

        </nav>
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
    width: 200px;
    height: 200px;
    object-fit: contain;
    object-position: center;
    border-radius: 50%;
    border: 2px solid #333;
}

.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
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

@media (min-width: 1600px) {
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
