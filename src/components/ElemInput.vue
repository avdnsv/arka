<script>
export default {
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    type: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    modelModifiers: {
      default: () => ({}),
    },
    errors: {
      type: Array,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    hasError() {
      if (this.errors.includes(this.name)) return "error";
    },
  },
};
</script>

<template>
  <label class="label" v-if="label" :for="name"> {{ label }}</label>
  <input
    :class="['input', hasError]"
    :id="name"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
.input {
  font-size: inherit;
  outline: none;
  padding: 10px 12px 10px 16px;
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  width: 110px;
}

.table .input {
  width: 100%;
}

.input.error {
  border: 1px solid var(--color-red);
  background: url("../assets/images/alert.svg") no-repeat;
  background-position: center right 12px;
  background-size: 20px;
  padding: 10px 40px 10px 16px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  appearance: textfield;
}
</style>
