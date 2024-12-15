<template>
  <label class="checkbox">
    <span class="checkmark"></span>
    <input type="checkbox" :id="id" :value="value" @change="filterDatasets()" v-model="isChecked" />
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
    selectedYear: String,
    filterDatasets: Function,
  },
  data() {
    return {
      isChecked: true,
    };
  },
  methods: {
    onChange() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.filterDatasets();
    },
  },
};
</script>
