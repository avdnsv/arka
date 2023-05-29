<script>
export default {
  props: {
    options: {
      type: Array,
    },
  },
};
</script>

<template>
  <div class="nav-options">
    <ul class="nav-options__list">
      <li
        class="nav-options__list-item"
        v-for="option in options"
        :key="option"
      >
        <a class="nav-options__link" :href="option.href">{{ option.name }}</a>
      </li>
    </ul>
  </div>
</template>
v
<style>
.nav-options {
  border: 1px solid var(--color-grey);
  border-top: 0;
  border-radius: 0 0 8px 8px;
  background-color: var(--color-white);
  position: absolute;
  top: 69px;
  left: -24px;
  padding: 24px;
  white-space: nowrap;
  z-index: 1000;
  height: auto;
  width: auto;
  animation: dropDown 0.3s ease;
  transform-origin: top;
}

.nav-options__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px;
}

.nav-options__list-item {
  display: initial;
}

.nav-options__link {
  color: var(--color-black);
  text-decoration: none;
}

.nav-options__link:hover {
  color: var(--color-grey);
  transition: all 0.3s ease 0s;
}

@keyframes dropDown {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
