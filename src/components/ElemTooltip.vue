<script>
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    QuestionMarkCircleIcon,
  },
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      visibleTooltipWindow: false,
    };
  },
  methods: {
    hideTooltip() {
      this.visibleTooltipWindow = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideTooltip.bind(this), true);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.hideTooltip, true);
  },
};
</script>

<template>
  <div class="tooltip" @click="visibleTooltipWindow = !visibleTooltipWindow">
    <a href="http://"><QuestionMarkCircleIcon /> </a>
    <Transition>
      <div class="hidden" v-show="visibleTooltipWindow">
        <p class="paragraph" v-html="title"></p>
      </div>
    </Transition>
  </div>
</template>

<style>
.tooltip {
  position: relative;
}

.tooltip svg {
  width: 20px;
  padding-bottom: 7px;
}

.tooltip:hover svg {
  color: var(--color-black);
  transition: all 0.3s ease 0s;
}

.hidden {
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  background-color: var(--color-white);
  color: var(--color-black);
  display: grid;
  place-items: center;
  padding: 16px;
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translate(-50%);
  box-shadow: 0px 5px 10px 0px rgba(159, 159, 173, 0.4);
  z-index: 1000;
  min-width: 320px;
  width: 560px;
}

.hidden .paragraph {
  font-size: 13px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
