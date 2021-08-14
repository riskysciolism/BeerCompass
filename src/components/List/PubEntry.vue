<template>
  <div @click="togglePub" class="box" :class="{ active: pub.active }">
    <p class="name">{{ pub.name }}</p>
    <i class="category pi pi-times"></i>
    <p class="position" v-if="pub.active">{{ pub.position.toString() }}</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "@vue/runtime-core";
  import Pub from "@/types/Pub";

  export default defineComponent({
    name: "PubEntry",
    props: {
      pub: {
        type: Object as PropType<Pub>,
        required: true,
      },
    },
    setup(props, context) {
      function togglePub() {
        context.emit("togglePub", props.pub.id);
      }

      return {
        togglePub,
      };
    },
  });
</script>

<style>
  .box {
    width: 100%;
    height: 3em;

    transition: height 0.2s ease-in-out;

    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    display: grid;
    justify-items: stretch;
    grid-template-columns: 2% auto 28% 2%;
    grid-template-rows: 60% 40%;
  }

  .box.active {
    background: green;
    height: 5em;
  }

  .name {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 1;
  }

  .category {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 1;
  }

  .position {
    grid-row-start: 2;
    grid-row-end: 2;
  }
</style>
