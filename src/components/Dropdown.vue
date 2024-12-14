<template>
  <div>
    <select v-model="selectedOption">
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
    selectedYear: String
  },
  data() {
    return {
      selectedOption: this.selectedYear
    }
  },
  watch: {
    selectedOption(newSelected) {
      this.$emit('update:selectedYear', newSelected);
    }
  }
}
</script>
