<script>
import OpenIndicator from "./icons/OpenIndicator.vue";

export default {
  components: {
    OpenIndicator,
  },
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    title: {
      type: String,
    },
    options: {
      type: Array,
    },
    errors: {
      type: Array,
    },
  },
  emits: ["select"],
  data() {
    return {
      visibleOptions: false,
    };
  },
  methods: {
    chooseOption(option, value) {
      this.$emit("select", this.name, option, value);
      this.hideOptions;
    },
    hideOptions() {
      this.visibleOptions = false;
    },
  },
  computed: {
    hasError() {
      if (this.errors.includes(this.name)) return "error";
    },
  },
  mounted() {
    document.addEventListener("click", this.hideOptions.bind(this), true);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.hideOptions, true);
  },
};
</script>

<template>
  <label class="label" :for="name"> {{ label }}</label>
  <div :class="['vue-select', hasError]" :id="name">
    <div class="wrapper" @click="visibleOptions = !visibleOptions">
      <div class="vue-select-title">
        {{ title }}
      </div>
      <open-indicator :class="{ rotated: visibleOptions }" />
    </div>
    <Transition>
      <div class="options" v-show="visibleOptions">
        <div
          class="option"
          v-for="(option, index) in options"
          :value="index + 1"
          @click="chooseOption(option, index + 1)"
          :key="index"
        >
          {{ option }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.vue-select {
  position: relative;
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  width: 100%;
  height: 40px;
  cursor: pointer;
}

.vue-select-title {
  display: flex;
  align-items: center;
  padding-left: 16px;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

.vue-select .wrapper {
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.vue-select .option {
  padding: 4px 16px;
}

.options .option:hover {
  background-color: var(--color-grey);
  color: var(--color-white);
}

.options {
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  background-color: var(--color-white);
  position: absolute;
  top: 40px;
  left: 0;
  overflow: hidden;
  box-shadow: 0px 5px 10px 0px rgba(159, 159, 173, 0.4);
  z-index: 1000;
  width: 100%;
}

.vue-select svg {
  color: var(--color-grey);
  height: 20px;
  width: 20px;
  margin: 0 12px 0 8px;
  transition: all 0.3s ease-in-out;
}

.vue-select .rotated {
  transform: rotate(180deg);
  transition: all 0.3s ease-in-out;
}

.vue-select.error {
  border: 1px solid var(--color-red);
  background: url("../assets/images/alert.svg") no-repeat;
  background-position: center right 36px;
  background-size: 20px;
}

.vue-select.error .vue-select-title {
  margin-right: 28px;
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
