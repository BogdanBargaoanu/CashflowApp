<template>
    <h1 class="text-center dashboard-heading">Dashboard</h1>
    <div class="container-fluid dashboard">
        <div class="content-box cb1">
            <img src="../assets/dashboard-img/current-info.png" alt="current-info" class="current-info-icon">
            <span class="dashboard-text account">Current account</span>
            <span class="current-balance" :class="{ 'text-danger': this.currentBalanceLei < 0, 'text-success': this.currentBalanceLei >= 0 }">{{ this.currentBalanceLei }} LEI</span>
            <span class="current-balance" :class="{ 'text-danger': this.currentBalanceEuro < 0, 'text-success': this.currentBalanceEuro >= 0 }">{{ this.currentBalanceEuro }} EURO</span>
            <span class="current-balance" :class="{ 'text-danger': this.currentBalanceUSD < 0, 'text-success': this.currentBalanceUSD >= 0 }">{{ this.currentBalanceUSD }} USD</span>
        </div>
        <div class="content-box cb2">
            <img src="../assets/dashboard-img/chart-icon.png" alt="chart-icon" class="chart-icon">
            <div id="linechart"></div>
        </div>
        <div @click="cashflowLog()" class="content-box cb3">
            <img src="../assets/dashboard-img/cashflow-log.png" alt="cashflow-log" class="cashflow-log-icon">
            <span class="dashboard-text">Cashflow</span>
        </div>
        <div class="content-box cb4">
            <img src="../assets/dashboard-img/categories-graph.png" alt="categories-graph"
                class="categories-graph-icon">
            <span class="dashboard-text">Categories graphs</span>
        </div>
        <div @click="entities()" class="content-box cb5"><span class="dashboard-text">Entities</span>
        </div>
        <button @click="logout()" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
    </div>
</template>

<script>
import { GoogleCharts } from 'google-charts';
export default {
    name: 'DashboardPage',
    data() {
        return {
            currentBalanceLei: 0,
            currentBalanceEuro: 0,
            currentBalanceUSD: 0
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user-token');
            this.$router.push('/login');
        },
        cashflowLog() {
            this.$router.push('/cashflow-log');
        },
        entities() {
            this.$router.push('/entities');
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
        getCurrentBalance() {

        }
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