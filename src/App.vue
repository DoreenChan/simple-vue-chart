<template>
  <header>
    <h1>Simple Charts build by Vue-ChartJS (Chart.js)</h1>
  </header>

  <main>
    <div>
      <h3>Sales and Profit Margin Combo Chart</h3>

      <!-- Fliter wrapper -->
      <fieldset>
        <legend>Filters</legend>
        <div class="chart-filters-wrapper">
          <CheckBox
            v-for="filter in chartFilters.checkboxes"
            :key="filter.id"
            :label="filter.label"
            :id="filter.id"
            :value="filter.label"
            ref="checkboxRef"
            @update:checked="handleUpdateChecked"
          />

          <div class="dropdown-wrapper">
            Year:
            <DropDown
              :options="chartFilters.dropdown.options"
              :selectedYear="chartFilters.dropdown.selected"
              @update:selectedYear="handleUpdateSelect"
            />
          </div>

          Title: <input v-model="chartTitle" placeholder="Please enter your chart title." />
        </div>
      </fieldset>

      <!-- Chart Wrapper -->
      <div class="chart-wrapper">
        <h3>{{ chartTitle }}</h3>

        <!-- <Bar ref="comboRef" id="combo-chart" :options="chartOptions" :data="chartData" /> -->
        <ComboChart ref="comboRef" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import CheckBox from './components/Checkbox.vue';
import DropDown from './components/DropDown.vue';
import ComboChart from './components/ComboChart.vue';
import { chartData, chartOptions, chartFilters } from './chartConfig.js';

export default {
  name: 'SimpleChart',
  components: {
    ComboChart,
    CheckBox,
    DropDown,
  },
  setup() {
    const chartTitle = ref('Chart Title');
    const selectedYear = ref('');
    const comboRef = ref(null);
    const checkboxRef = ref(null);

    const filterDatasets = (year: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const chart = comboRef.value.chart;
      const datasets = chart.data.datasets;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const checkedValues = checkboxRef.value?.filter(
        (checkbox: { isChecked: boolean }) => checkbox.isChecked,
      );

      //Hide all datasets first
      datasets.forEach((dataset: { hidden: boolean }) => (dataset.hidden = true));

      //Check for type
      checkedValues.forEach((checkbox: { label: unknown }) => {
        datasets.find(
          (data: { label: unknown; stack: string }) =>
            data.label == checkbox.label && data.stack == year,
        ).hidden = false;
      });

      //reassign chart's datasets
      chart.data.datasets = datasets;

      //Check for x-axis labeling
      chart.options.scales.x.title.text = year;
      chart.update();
    };

    const handleUpdateSelect = (value: string) => {
      filterDatasets(value);
    };

    const handleUpdateChecked = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const year = comboRef.value?.chart.options.scales.x.title.text;
      filterDatasets(year);
    };

    return {
      chartData,
      chartOptions,
      chartFilters,
      chartTitle,
      selectedYear,
      handleUpdateSelect,
      handleUpdateChecked,
      comboRef,
      checkboxRef,
    };
  },
};
</script>
