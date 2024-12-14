<template>
  <label class="checkbox">
    <span class="checkmark"></span>
    <input type="checkbox" :id="id" :value="value" @change="emitUncheck($event.target.checked)" v-model="isChecked" />
    <p>{{ label }}</p>
  </label>
</template>

<script lang="ts">
export default {
  name: "CheckBox",
  props: {
    label: String,
    id: Number,
    value: String,
    selectedYear: String,
  },
  data() {
    return {
      isChecked: true
    }
  },
  methods: {
    emitUncheck(e) {
      this.$emit('toggle-chart-type-filter');
    }
  }
};
</script>
