<!-- eslint-disable vue/no-unused-components -->
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
            :filterDatasets="filterDatasets"
            :selectedYear="chartFilters.dropdown.selected"
            ref="checkboxRef"
          />

          <div class="dropdown-wrapper">
            Year:
            <DropDown
              :options="chartFilters.dropdown.options"
              :selectedYear="chartFilters.dropdown.selected"
              @update:selectedYear="updateSelectedYear"
              :filterDatasets="filterDatasets"
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
    return {
      chartData,
      chartOptions,
      chartFilters,
      chartTitle: 'Chart Title',
      selectedYear: chartFilters.dropdown.selected,
    };
  },
  methods: {
    hideAllDataset(data: { hidden: boolean }[]) {
      data.forEach((dataset: { hidden: boolean }) => (dataset.hidden = true));
    },
    filterDatasets() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const chart = this.$refs.comboRef.chart;
      const datasets = this.chartData.datasets;
      const year = this.selectedYear ? this.selectedYear : chartFilters.dropdown.selected;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const checkedValues = this.$refs.checkboxRef?.filter(
        (checkbox: { isChecked: boolean }) => checkbox.isChecked,
      );

      //Hide all datasets first
      this.hideAllDataset(datasets);

      //Check for type
      checkedValues.forEach((checkbox: { label: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        datasets.find(
          (data: { label: unknown; stack: string }) =>
            data.label == checkbox.label && data.stack == year,
        ).hidden = false;
      });

      //reassign chart's datasets
      chart.data.datasets = datasets;

      //Check for x-axis labeling
      chart.options.scales.x.title.text = this.selectedYear;
      chart.update();
    },
    updateSelectedYear(newSelectedYear: string) {
      //Update selected year
      this.selectedYear = newSelectedYear;
    },
  },
};
</script>
