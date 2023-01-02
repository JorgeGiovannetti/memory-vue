<template>
  <main
    class="p-5 flex flex-col bg-zinc-50 dark:bg-zinc-800 min-h-screen text-center items-center"
  >
    <h1 class="mb-8 text-3xl font-bold dark:text-white">Memory Game</h1>
    <!-- <h3 class="text-xl font-bold mb-4 dark:text-white">Turns: {{ turns }}</h3> -->
    <div v-if="!cardsLeft">
      <h3 class="text-xl font-bold mb-4 dark:text-white">
        You found all the Pokémon in {{ turns }} turns!
      </h3>
      <button
        class="rounded-full font-bold text-white ease-out duration-100 bg-rose-700 hover:bg-rose-500 py-2 px-6 mb-4"
        v-on:click="reset"
      >
        Restart Game
      </button>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 w-10/12 lg:w-7/12"
    >
      <div v-for="card in cards">
        <Card :data="card" v-on:click="showCard(card)" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cardset from "./common/cardset";
import { CardData } from "./common/types";
import { shuffle } from "./common/utils";
import Card from "./components/Card.vue";

export default defineComponent({
  components: {
    Card,
  },
  data() {
    return {
      cards: shuffle(
        cardset.reduce(
          (acc, curr) =>
            acc.concat([
              { value: curr.label, img_path: "", type: "label", show: false },
              {
                value: curr.label,
                img_path: curr.img_path,
                type: "image",
                show: false,
              },
            ]),
          <CardData[]>[]
        )
      ),
      currCard: null as CardData | null,
      turns: 0,
      cardsLeft: cardset.length * 2,
    };
  },
  methods: {
    reset() {
      this.cards = shuffle(this.cards.map((card) => (card.show = false)));
      this.turns = 0;
      this.cardsLeft = cardset.length * 2;
    },
    showCard(card: CardData) {
      if (card.show) {
        return;
      }

      card.show = true;

      if (!this.currCard) {
        this.currCard = card;
        return;
      }

      this.turns++;

      if (this.currCard.value === card.value) {
        this.cardsLeft -= 2;
      } else {
        this.currCard.show = false;
        card.show = false;
      }

      this.currCard = null;
    },
  },
});
</script>
