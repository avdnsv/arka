<script>
import { RouterView } from "vue-router";

export default {
  components: {
    RouterView,
  },
};
</script>

<template>
  <router-view />
</template>

<style>
.title,
.label {
  display: block;
  font-weight: bold;
  font-size: inherit;
  color: var(--color-grey);
  margin: 0 0 8px;
}
</style>
