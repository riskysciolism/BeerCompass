<template>
  <div class="grid-container">
    <Bottle :currentPosition="currentPosition" />
    <List @pubChanged="setCurrentPubPosition" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
  import Bottle from "./components/Compass/Bottle.vue";
  import List from "./components/List/List.vue";
  import { Position } from "./types/Position";
  import Pub from "./types/Pub";

  export default defineComponent({
    name: "App",
    components: {
      Bottle,
      List,
    },
    setup() {
      const currentPosition = ref<Position>(new Position(0, 0));

      function setCurrentPubPosition(pub: Pub) {
        currentPosition.value = pub.position;
        console.log("Current position set in app");
        console.log(currentPosition.value);
      }

      return { setCurrentPubPosition, currentPosition };
    },
  });
</script>

<style>
  #app {
    height: 100%;
  }
  .grid-container {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: stretch;
    grid-template-columns: 5% auto 5%;
    grid-template-rows: 2% 37% auto;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }
</style>
