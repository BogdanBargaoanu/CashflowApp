<template>
  <UserLogin msg="Login" />
  <div id="app">
    <nav>
      <router-link to="/login"></router-link>
      <router-link to="/register"></router-link>
      <router-link to="/dashboard"></router-link>
      <router-link to="/cashflow-log"></router-link>
      <router-link to="/entities"></router-link>
      <router-link to="/graph"></router-link>
    </nav>
    <!-- This is where the content of the current route will be displayed -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
