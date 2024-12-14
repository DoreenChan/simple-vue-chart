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
            @toggle-chart-type-filter="toogleChartTypeFilter"
            :selectedYear="chartFilters.dropdown.selected"
            ref="checkboxRef"
          />

          <div class="dropdown-wrapper">
            Year:
            <DropDown
              :options="chartFilters.dropdown.options"
              :selectedYear="chartFilters.dropdown.selected"
              @update:selectedYear="updateSelectedYear"
            />
          </div>

          Title: <input v-model="chartTitle" placeholder="Please enter your chart title." />
        </div>
      </fieldset>

      <!-- Chart Wrapper -->
      <div class="chart-wrapper">
        <h3>{{ chartTitle }}</h3>

        <Bar ref="comboRef" id="combo-chart" :options="chartOptions" :data="chartData" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import CheckBox from './components/Checkbox.vue';
import DropDown from './components/Dropdown.vue';
import { chartData, chartOptions, chartFilters } from './chartConfig.js';
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default {
  name: 'SimpleChart',
  components: {
    Bar,
    Line,
    CheckBox,
    DropDown,
  },
  data() {
    return { chartData, chartOptions, chartFilters, chartTitle: 'Chart Title' };
  },
  methods: {
    hideAllDataset(datasets) {
      datasets.forEach((dataset) => {
        dataset.hidden = true;
      });
    },
    getDatasetByYear(datasets) {
      const year = this.selectedYear ? this.selectedYear : chartFilters.dropdown.selected;

      const data = datasets.filter((dataset) => dataset.stack === year);
      data.forEach((dataset) => {
        dataset.hidden = false;
      });

      return { data };
    },
    filterDatasets() {
      const chart = this.$refs.comboRef.chart;
      const datasets = chart.data.datasets;
      const uncheckedValues = this.$refs.checkboxRef.filter(
        (checkbox) => checkbox.isChecked == false,
      );

      //Hide all datasets first
      this.hideAllDataset(datasets);

      //Check for year
      const displayDataset = this.getDatasetByYear(datasets).data;

      //Check for type
      uncheckedValues.forEach((checkbox) => {
        displayDataset.find((data) => data.label == checkbox.label).hidden = true;
      });

      //Check for x-axis labeling
      chart.options.scales.x.title.text = this.selectedYear;
      chart.update();
    },
    toogleChartTypeFilter() {
      this.filterDatasets();
    },
    updateSelectedYear(newSelectedYear) {
      //Update selected year
      this.selectedYear = newSelectedYear;
      //Filter
      this.filterDatasets();
    },
  },
};
</script>
