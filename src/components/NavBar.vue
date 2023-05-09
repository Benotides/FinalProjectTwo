<template>
  <div>
    <nav>
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/auth/sign-in" class="nav-link">Sign in</RouterLink>
      <RouterLink to="/auth/sign-up" class="nav-link">Sign up</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  background-color: #aaa;
  padding: 1.5rem;
  margin-bottom: 3%;
  background-image: url('../assets/fondonav.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  width: auto;
}

.nav-link {
  font-family: 'Aniron', sans-serif;

  color: bisque;
  text-decoration: none;
  margin: 0 4rem;
  font-size: 1.2rem;
}

.nav-link:hover {
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  nav {
    flex-direction: column;
    display: flex;
  justify-content: center;
  background-color: #aaa;
  padding: 1rem;
  margin-bottom: 3%;
  background-image: url('../assets/fondonav.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  width: auto;
  }

}
 

</style>
