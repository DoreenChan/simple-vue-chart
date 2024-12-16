<template>
  <div>
    <select @change="handleSelectChange">
      <option v-for="option in options" :key="option.id" :value="option.label">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    options: Array,
    selectedYear: String,
  },
  emits: ['update:selectedYear'],
  setup(props, { emit }) {
    const handleSelectChange = (event: { target: { value: never } }) => {
      emit('update:selectedYear', event.target.value);
    };

    return { handleSelectChange };
  },
};
</script>
