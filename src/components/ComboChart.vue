<template>
  <canvas id="comboChart" :data="data" :options="options"></canvas>
</template>

<script lang="ts">
import { shallowRef, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

export default {
  props: {
    data: Object,
    options: Object,
  },
  emits: ['update-chart'],
  setup(props) {
    const chart = shallowRef(null);

    onMounted(() => {
      Chart.register(...registerables);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      chart.value = new Chart(document.getElementById('comboChart'), {
        data: props.data,
        options: props.options,
      });
    });

    return {
      chart,
    };
  },
};
</script>
