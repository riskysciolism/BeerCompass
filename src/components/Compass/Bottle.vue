<template>
  <Card id="compassBoundary">
    <template #content>
      <canvas class="compass" id="beerCompass"></canvas>
    </template>
  </Card>
</template>
<script lang="ts">
  import { Position } from "@/types/Position";
  import {
    defineComponent,
    onMounted,
    PropType,
    watch,
  } from "@vue/runtime-core";
  import { CompassService } from "./CompassService";
  import { Observable } from "rxjs";
  import Card from "primevue/card";

  export default defineComponent({
    name: "Bottle",
    props: {
      currentPosition: {
        type: Object as PropType<Position>,
        required: true,
      },
    },
    components: {
      Card,
    },
    setup(props) {
      const currentPosition = new Observable<Position>((observer) => {
        watch(
          () => props.currentPosition,
          (newValue, oldValue) => {
            console.log(
              "Watch props.currentPosition function called with args:",
              newValue,
              oldValue
            );
            observer.next(newValue);
          }
        );
      });

      const compassService = new CompassService();
      const heading = compassService.getHeadingToTarget(currentPosition);

      function renderCompass(heading: Observable<number>) {
        let canvas = document.getElementById(
          "beerCompass"
        ) as HTMLCanvasElement;

        let boundary = document.getElementById(
          "compassBoundary"
        ) as HTMLElement;
        canvas.width = boundary.offsetWidth;
        canvas.height = boundary.offsetHeight;

        const ctx = canvas.getContext("2d");

        let img = new Image();
        img.src = "/img/beerBottle.png";

        img.width = img.height =
          canvas.width / 1.5 < canvas.height / 1.5
            ? canvas.width / 1.5
            : canvas.height / 1.5;

        img.onload = function () {
          const cache = img;
          const ih = cache.height;
          const iw = cache.width;

          heading.subscribe({
            next(angle) {
              ctx!.save();
              ctx!.clearRect(0, 0, canvas.width, canvas.height);
              ctx!.translate(canvas.width / 2, canvas.height / 2);
              ctx!.rotate((angle * Math.PI) / 180);
              ctx!.translate(-(canvas.width / 2), -(canvas.height / 2));
              ctx!.drawImage(
                img,
                canvas.width / 2 - iw / 2,
                canvas.height / 2 - ih / 2,
                iw,
                ih
              );
              ctx!.restore();
            },
          });
        };
      }

      onMounted(() => {
        renderCompass(heading);
      });
    },
  });
</script>
<style scoped>
  div,
  canvas,
  Card {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;

    justify-self: stretch;
  }
</style>
