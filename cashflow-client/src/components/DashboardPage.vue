<template>
    <h1 class="text-center dashboard-heading">Dashboard</h1>
    <div class="container-fluid dashboard">
        <div class="content-box cb1">current-info
            <img src="../assets/dashboard-img/current-info.png" alt="current-info" class="current-info-icon">
        </div>
        <div class="content-box cb2">
            <img src="../assets/dashboard-img/chart-icon.png" alt="chart-icon" class="chart-icon">
            <div id="linechart"></div>
        </div>
        <div @click="cashflowLog()" class="content-box cb3">cashflow
            <img src="../assets/dashboard-img/cashflow-log.png" alt="cashflow-log" class="cashflow-log-icon">
        </div>
        <div class="content-box cb4">categories-graph
            <img src="../assets/dashboard-img/categories-graph.png" alt="categories-graph" class="categories-graph-icon">
        </div>
        <button @click="logout()" class="btn-logout">Logout</button>
    </div>
</template>

<script>
import { GoogleCharts } from 'google-charts';
export default {
    name: 'DashboardPage',
    methods: {
        logout() {
            localStorage.removeItem('user-token');
            this.$router.push('/login');
        },
        cashflowLog() {
            this.$router.push('/cashflow-log');
        },
        drawChart() {
            // Load the Visualization API and the corechart package
            GoogleCharts.load(() => {
                // Create the data table
                var data = GoogleCharts.api.visualization.arrayToDataTable([
                    ['Year', 'Sales', 'Expenses'],
                    ['2004', 1000, 400],
                    ['2005', 1170, 460],
                    ['2006', 660, 1120],
                    ['2007', 1030, 540],
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
        // Draw the chart when the component is mounted
        this.drawChart();
    },
}
</script>

<style scoped>
#linechart {
    width: 85%;
    margin-left: 10%;
}
</style>