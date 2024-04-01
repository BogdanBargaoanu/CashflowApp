<template>
    <div id="cashflow-log">
        <ul class="cashflow-list">
            
            <li v-for="(log, index) in cashflowLog" :key="index">
                <div class="cashflow-row">
                    <div class="cashflow-log-id">{{ log.idcashflowLog }}</div>
                    <div class="cashflow-log-name">{{ log.name }}</div>
                    <div class="cashflow-log-type">{{ log.type }}</div>
                    <div class="cashflow-log-amount">{{ log.value }}</div>
                    <div class="cashflow-log-currency">{{ log.currency }}</div>
                    <div class="cashflow-log-description">{{ log.description }}</div>
                    <div class="cashflow-log-date">{{ log.date }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CashFlowLog',
    data() {
        return {
            cashflowLog: []
        }
    },
    created() {
        const token = localStorage.getItem('user-token'); // get the token from local storage
        axios.get('http://localhost:3000/cashflowlog', {
            headers: {
                Authorization: `Bearer ${token}` // send the token in the Authorization header
            }
        })
            .then(response => {
                this.cashflowLog = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
</script>

<style scoped>
#cashflow-log {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    width: 100%;
}
</style>