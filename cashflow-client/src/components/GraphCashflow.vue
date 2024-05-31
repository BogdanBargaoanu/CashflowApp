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
import axios from 'axios';
export default {
    name: 'GraphCashflow',
    data() {
        return {
            accountValues: { ron: 0, eur: 0, usd: 0 },
            cashflow: [],
            graphData: [['Date', 'RON', 'EUR', 'USD']],
        }
    },
    methods: {
        drawChart() {
            // Load the Visualization API and the corechart package
            GoogleCharts.load(() => {
                //console.log(this.graphData);
                // Create the data table
                var data = GoogleCharts.api.visualization.arrayToDataTable(this.graphData);

                // Set chart options
                var options = {
                    title: 'Account evolution',
                    curveType: 'function',
                    legend: { position: 'bottom' },
                };

                // Instantiate and draw our chart, passing in some options
                var chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('linechart'));
                chart.draw(data, options);
            }, { packages: ['corechart'] });
        },
        getCurrentInfo() {
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

                        // add the current info to the graph data
                        this.graphData.push([log.date, this.accountValues['ron'], this.accountValues['eur'], this.accountValues['usd']]);
                    }
                    this.drawChart();
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
    created() {
        this.getCurrentInfo();
    }
}
</script>

<style scoped>
#linechart {
    width: 100%;
    height: 90%;
}
</style>