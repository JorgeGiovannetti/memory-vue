<template>
  <div
    class="bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-indigo-400 rounded-lg shadow-lg justify-center items-center aspect-square flex"
  >
    <img
      v-if="data.type === 'image'"
      class="rounded-t-lg"
      :src="imageURL(data.value)"
      alt=""
    />
    <div v-if="data.type === 'label'" class="p-6">
      <h5 class="dark:text-white text-xl font-medium mb-2">{{ data.value }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData } from "../common/types";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<CardData>,
      required: true,
    },
  },
  setup() {
    const imageURL = (value: string) =>
      new URL(`../assets/images/${value}`, import.meta.url).href;

    return { imageURL };
  },
});
</script>
