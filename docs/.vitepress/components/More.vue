<template>
  <span>
    <span v-if="expanded">
      <slot/>
    </span>
    &nbsp;
    <a v-if="expanded" @click="expanded = false">…less</a>
    <a v-else @click="expanded = true">more…</a>
  </span>
</template>

<script setup>

import {ref} from 'vue';

const expanded = ref(false);

</script>

<style scoped>

a {
  cursor: pointer;
}

</style>
