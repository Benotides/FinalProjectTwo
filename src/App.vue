<script>
import NavBar from '../src/components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {}
  }
}
</script>

<template>
  <NavBar />
  <header class="container">
    <img class="logo" src="../src/assets/logoto.jpg" alt="Logo de Tolkien" />
    <div class="wrapper"></div>
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
  width: 250px;
  height: 250px;
  object-fit: contain;
  object-position: center;
  border-radius: 100%;
  display: block;
  margin: 0 auto 2rem;

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



/* Estilos para pantalla de tablet */
@media screen and (max-width: 991px) {
  .logo {
    width: 200px;
    height: 200px;
  }


}

/* Estilos para pantalla de móvil */
@media screen and (max-width: 767px) {
  .logo {
    width: 150px;
    height: 150px;
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


}
</style>
