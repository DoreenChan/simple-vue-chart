<template>
  <label class="checkbox">
    <span class="checkmark"></span>
    <input
      type="checkbox"
      :id="id"
      :value="value"
      v-model="isChecked"
      @change="handleUpdateChecked"
    />
    <p>{{ label }}</p>
  </label>
</template>

<script lang="ts">
export default {
  name: 'CheckBox',
  props: {
    label: String,
    id: String,
    value: String,
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const handleUpdateChecked = (event: { target: { value: never } }) => {
      emit('update:checked', event.target.value);
    };

    return {
      isChecked: true,
      handleUpdateChecked,
    };
  },
};
</script>
