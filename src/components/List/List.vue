<template>
  <div id="pubList">
    <DataView :value="pubs" :layout="layout">
      <template #header>
        <div class="p-grid p-nogutter">
          <h1>Test</h1>
        </div>
      </template>
      <template #list="pubEntry">
        <div class="p-col-12 pubEntry">
          <PubEntry @togglePub="togglePubEntry" :pub="pubEntry.data" />
        </div>
      </template>
    </DataView>
    <!-- <ul>
      <li v-for="(pub, index) in pubs" :key="index">
        <PubEntry @togglePub="togglePubEntry" :pub="pub" />
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
  import { Position } from "@/types/Position";
  import Pub from "@/types/Pub";
  import PubEntry from "./PubEntry.vue";
  import { defineComponent, onMounted, ref } from "@vue/runtime-core";
  import DataView from "primevue/dataview";

  export default defineComponent({
    name: "List",
    components: {
      DataView,
      PubEntry,
    },
    setup(_, context) {
      const layout = "list";

      const pubs = ref<Pub[]>([
        { id: "1", name: "test", position: new Position(44, 12) },
        { id: "2", name: "test2", position: new Position(1, 40) },
      ]);

      function togglePubEntry(pubId?: string) {
        let activePub: Pub = pubs.value[0] as Pub;
        // Inital page load
        if (!pubId) {
          pubId = activePub.id;
        }

        for (let i = 0; i < pubs.value.length; i++) {
          if (pubs.value[i].id == pubId) {
            pubs.value[i].active = true;
            activePub = pubs.value[i] as Pub;
          } else {
            pubs.value[i].active = false;
          }
        }

        context.emit("pubChanged", activePub);
      }

      onMounted(() => {
        togglePubEntry();
      });

      return {
        pubs,
        togglePubEntry,
        layout,
      };
    },
  });
</script>

<style>
  #pubList {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;

    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pubEntry {
    align-items: center;
    padding: 1rem;
    width: 100%;
  }
</style>
