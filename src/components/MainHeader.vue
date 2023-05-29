<script>
import OpenIndicator from "./icons/OpenIndicator.vue";
import ElemNav from "./ElemNav.vue";
import ArcName from "./icons/ArcName.vue";

export default {
  components: {
    OpenIndicator,
    ElemNav,
    ArcName,
  },
  data() {
    return {
      visibleOptions: false,
      currentOption: null,
      menuList: {
        Расчёты: [{ name: "Теплотехнический расчёт", href: "/heat" }],
        Нагрузки: [
          { name: "Снеговая нагрузка", href: "/snow" },
          { name: "Ветровая нагрузка", href: "/wind" },
        ],
        Справка: [{ name: "Как пользоваться", href: "/faq" }],
      },
    };
  },
  methods: {
    openMenu(item) {
      this.currentOption = item;
    },
    hideOption() {
      this.currentOption = null;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideOption.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideOption, true);
  },
};
</script>

<template>
  <header class="header">
    <div class="wrapper-header">
      <a class="link" href="/"><arc-name /></a>
      <nav class="menu">
        <ul class="menu__list">
          <li
            class="menu__list-item"
            v-for="(item, key) in menuList"
            :key="key"
          >
            <a
              class="menu__link"
              :class="{ active: currentOption == item }"
              @click="openMenu(item)"
              target="_blank"
            >
              {{ key }}
              <open-indicator
                class="returned"
                :class="{ rotated: currentOption == item }" /></a
            ><elem-nav :options="item" v-if="currentOption == item" />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
.header {
  border-bottom: 1px solid var(--color-grey);
  background-color: var(--color-white);
  height: 70px;
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
}

.wrapper-header {
  height: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  max-width: 944px;
  margin: auto;
}

.wrapper-header svg {
  height: 30px;
  width: fit-content;
}

.menu,
.menu__list,
.menu__list-item {
  height: inherit;
}

.menu__list {
  display: flex;
  gap: 16px;
  margin: 0px;
  padding: 0px;
}

.menu__list-item {
  display: initial;
  position: relative;
  width: fit-content;
}

.menu__link {
  cursor: pointer;
  display: flex;
  gap: 8px;
  height: inherit;
  align-items: center;
  color: var(--color-blakc);
  text-decoration: none;
}

.menu__link svg {
  height: 20px;
  width: 20px;
}

.menu__link .rotated {
  transform: rotate(180deg);
  transition: all 0.3s ease-in-out;
}

.menu__link:hover,
.active {
  color: var(--color-grey);
  transition: all 0.3s ease 0s;
  fill: var(--color-grey);
}

.returned {
  transition: all 0.3s ease-in-out;
}
</style>
