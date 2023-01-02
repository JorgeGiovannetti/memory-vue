<template>
  <main class="p-5 bg-zinc-50 dark:bg-zinc-800 min-h-screen text-center">
    <h1 class="mb-8 text-3xl font-bold dark:text-white">Memory Game</h1>
    <h3 class="text-xl font-bold mb-4 dark:text-white">Turns:</h3>
    <div class="grid grid-cols-5 xs:grid-cols-2 gap-4">
      <div v-for="card in cards">
        <Card :data="card" class="" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import cardset from "./common/cardset";
import { CardData } from "./common/types";
import { shuffle } from "./common/utils";
import Card from "./components/Card.vue";

export default {
  components: {
    Card,
  },
  data() {
    return {
      cards: shuffle(
        cardset.reduce(
          (acc, curr) =>
            acc.concat([
              { value: curr.label, type: "label" },
              { value: curr.img_path, type: "image" },
            ]),
          <CardData[]>[]
        )
      ),
    };
  },
};
</script>
