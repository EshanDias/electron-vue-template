<template>
  <!-- <div id="app"> -->
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <!-- <p>hi</p> -->
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
<style lang="scss">
@import url("./assets/css/main.scss");
</style>
