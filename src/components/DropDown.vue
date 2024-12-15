<template>
  <div>
    <select v-model="selectedOption" @change="filterDatasets()">
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
    filterDatasets: Function,
  },
  data() {
    return {
      selectedOption: this.selectedYear,
    };
  },
  methods: {
    onChange() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.filterDatasets();
    },
  },
  watch: {
    selectedOption(newSelected) {
      this.$emit('update:selectedYear', newSelected);
    },
  },
};
</script>
