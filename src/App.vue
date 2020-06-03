<template>
  <div id="app">
    <router-view class="main" />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss">
@import "@/assets/style/index.scss";
#app {
  height: 100%;
}
.main {
  background-color: #fff;
  overflow: hidden;
  width: 100%;
}
</style>
