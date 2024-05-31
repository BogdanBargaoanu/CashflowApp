<template>
    <h1 class="text-center dashboard-heading">Dashboard</h1>
    <div class="container-fluid dashboard">
        <div class="content-box cb1">
            <img src="../assets/dashboard-img/current-info.png" alt="current-info" class="current-info-icon">
            <span class="dashboard-text account">Current account</span>
            <span class="current-balance"
                :class="{ 'text-danger': accountValues['ron'] < 0, 'text-success': accountValues['ron'] >= 0 }">{{
                   accountValues['ron'] }} RON</span>
            <span class="current-balance"
                :class="{ 'text-danger': accountValues['eur'] < 0, 'text-success': accountValues['eur']  >= 0 }">{{
                    accountValues['eur']  }} EURO</span>
            <span class="current-balance"
                :class="{ 'text-danger': accountValues['usd']  < 0, 'text-success': accountValues['usd'] >= 0 }">{{
                    accountValues['usd'] }} USD</span>
        </div>
        <div class="content-box cb2" @click="graph()">
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
            <i class="fa-solid fa-building entities-display-icon"> / </i><i class="fa-solid fa-user entities-display-icon"></i>
        </div>
        <button @click="logout()" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
    </div>
</template>

<script>
import { GoogleCharts } from 'google-charts';
import axios from 'axios';
export default {
    name: 'DashboardPage',
    data() {
        return {
            accountValues: { ron: 0, eur: 0, usd: 0 },
            cashflow: [],
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
        graph() {
            this.$router.push('/graph');
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
                    title: 'Account performance',
                    curveType: 'function',
                    legend: { position: 'bottom' },
                };

                // Instantiate and draw our chart, passing in some options
                var chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('linechart'));
                chart.draw(data, options);
            }, { packages: ['corechart'] });
        },
        getCurrentBalance() {
            const token = localStorage.getItem('user-token'); // get the token from local storage
            axios.get('http://localhost:3000/cashflowlog', {
                headers: {
                    Authorization: `Bearer ${token}` // send the token in the Authorization header
                }
            })
                .then(response => {
                    this.cashflow = response.data;
                    for (let log of this.cashflow) {
                            if (log.type.toLowerCase() == 'income') {
                                this.accountValues[log.currency.toLowerCase()] += log.value;
                            } else if (log.type.toLowerCase() == 'expense') {
                                this.accountValues[log.currency.toLowerCase()] -= log.value;
                            }
                    }
                })
                .catch(error => {
                    localStorage.removeItem('user-token');
                    this.toastMessage = 'Invalid login: ' + error.response.data.message;
                    this.showToast = true;

                    setTimeout(() => {
                        this.showToast = false;
                    }, 5000);
                    this.$router.push('/login');
                    return;
                });
        },
    },
    mounted() {
        // Draw the chart when the component is mounted
        this.drawChart();
    },
    created() {
        this.getCurrentBalance();
    }
}
</script>

<style scoped>
#linechart {
    width: 85%;
    margin-left: 10%;
    margin-top: 3%;
}
</style>