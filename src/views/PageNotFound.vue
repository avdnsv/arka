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
  <div class="not-found">
    <svg
      width="161"
      height="70"
      viewBox="0 0 161 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57 25V45C57 58.2548 67.7452 69 81 69C94.2548 69 105 58.2548 105 45V25C105 11.7452 94.2548 1 81 1C67.7452 1 57 11.7452 57 25Z"
        stroke="#9F9FAD"
      />
      <path d="M36.5 70V35H2L36.5 0.5" stroke="#9F9FAD" />
      <path d="M159.5 70V35H125L159.5 0.5" stroke="#9F9FAD" />
    </svg>
    <h1 class="title">ОШИБКА · СТРАНИЦА НЕ НАЙДЕНА</h1>
  </div>
  <main-footer />
</template>

<style>
.not-found {
  margin: 130px auto 30px;
  max-width: 944px;
  display: grid;
  place-items: center;
  gap: 32px;
}
</style>
