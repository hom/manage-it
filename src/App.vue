<template>
  <div id="app">
    <!-- <Header /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Header from '@/components/header.vue';

export default {
  name: 'app',
  components: {
    // Header
  }
}
</script>

<style>
body {
  margin: 0;
  background: #110D11;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
