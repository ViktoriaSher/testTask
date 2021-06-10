<template>
  <div id="nav">
    <router-link to="/">Список валют</router-link> |
    <router-link to="/converter">Конвертер</router-link>
  </div>
  <router-view />
</template>
<script>
export default {
  name: "App",

  async mounted() {
    this.$store.dispatch("fetchList");
  },
};
</script>
<style lang="scss">
body {
  background-color: #c9e4d8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #2e8a61;
    }
  }
}
</style>
