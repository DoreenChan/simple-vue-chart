<template>
  <header>
    <h1>Simple Charts build by Vue-ChartJS (Chart.js)</h1>
  </header>

  <main>
    <div>
      <h3>Sales and Profit Margin Combo Chart</h3>

      <!-- Fliter wrapper -->
      <div class="chart-filters-wrapper">
        <CheckBox v-for="(filter) in chartFilters.checkboxes" :key="filter.id" :label="filter.label" :id="filter.id"
          :value="filter.label" @toggle-chart-type-filter="toogleChartTypeFilter"
          :selectedYear="chartFilters.dropdown.selected" ref="checkboxRef" />

        Year:
        <DropDown :options="chartFilters.dropdown.options" :selectedYear="chartFilters.dropdown.selected"
          @update:selectedYear="updateSelectedYear" />
      </div>

      <!-- Chart Wrapper -->
      <div class="chart-wrapper">
        <Bar ref="comboRef" id="combo-chart" :options="chartOptions" :data="chartData" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import CheckBox from './components/Checkbox.vue';
import DropDown from './components/Dropdown.vue';
import { chartData, chartOptions, chartFilters } from './chartConfig.js';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: 'SimpleChart',
  components: {
    Bar,
    CheckBox,
    DropDown
  },
  data() {
    return { chartData, chartOptions, chartFilters };
  },
  methods: {
    hideAllDataset(datasets) {
      datasets.forEach((dataset) => {
        dataset.hidden = true;
      });
    },
    groupDatasetByYear(datasets) {
      const year = this.selectedYear ? this.selectedYear : chartFilters.dropdown.selected;

      const data = datasets.filter((dataset) => dataset.stack === year);
      data.forEach(dataset => {
        dataset.hidden = false;
      });

      return { data }
    },
    filterDatasets() {
      const chart = this.$refs.comboRef.chart;
      const datasets = chart.data.datasets;
      const uncheckedValues = this.$refs.checkboxRef.filter(checkbox => checkbox.isChecked == false);

      //Hide all datasets first
      this.hideAllDataset(datasets);

      //Check for year
      const displayDataset = this.groupDatasetByYear(datasets).data;

      //Check for type
      uncheckedValues.forEach(checkbox => {
        displayDataset.find(data => data.label == checkbox.label).hidden = true;
      });
      chart.update();
    },
    toogleChartTypeFilter() {
      this.filterDatasets();
    },
    isChecked(chartType) {
      return !!chartType;
    },
    updateSelectedYear(newSelectedYear) {
      //Update selected year
      this.selectedYear = newSelectedYear;
      //Filter
      this.filterDatasets();
    }
  },
}
</script>
