<script>
import MainHeader from "../components/MainHeader.vue";
import MainFooter from "../components/MainFooter.vue";

export default {
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>

<template>
  <main-header />
  <div class="in-progress">
    <h1 class="title">РАЗДЕЛ НАХОДИТСЯ В РАЗРАБОТКЕ</h1>
  </div>

  <main-footer />
</template>

<style>
.in-progress {
  margin: 130px auto 30px;
  max-width: 944px;
  display: grid;
  place-items: center;
}
</style>
