<template>
    <div class="graph">
        <h1 class="text-center graph-heading">Graph</h1>
        <div class="content-box graph-container">
            <div id="linechart"></div>
        </div>
    </div>
</template>
<script>
import { GoogleCharts } from 'google-charts';
//import axios from 'axios';
export default {
    name: 'GraphCashflow',
    data() {
        return {
            accountValues: { ron: 0, eur: 0, usd: 0 },
            cashflow: [],
        }
    },
    methods: {
        drawChart() {
            // Load the Visualization API and the corechart package
            GoogleCharts.load(() => {
                // Create the data table
                var data = GoogleCharts.api.visualization.arrayToDataTable([
                    ['Date', 'RON', 'EUR', 'USD'],
                    ['2004', 1000, 400, 200],
                    ['2005', 1170, 460, 250],
                    ['2006', 660, 1120, 300],
                    ['2007', 1030, 540, 350],
                ]);

                // Set chart options
                var options = {
                    title: 'Company Performance',
                    curveType: 'function',
                    legend: { position: 'bottom' },
                };

                // Instantiate and draw our chart, passing in some options
                var chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('linechart'));
                chart.draw(data, options);
            }, { packages: ['corechart'] });
        },
    },
    mounted() {
        this.drawChart();
    },
}
</script>

<style scoped>
#linechart {
    width: 100%;
    height: 90%;
}
</style>