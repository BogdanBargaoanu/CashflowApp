<template>
 <div id="cashflow-log">
    <ul class="cashflow-list">
      <li v-for="(log, index) in cashflowLog" :key="index">
        <div class="row-header">
          <div class="cashflow-row">
            <p>ID: {{ log.idcashflowLog }}</p>
            <p>Name: {{ log.name }}</p>
            <p>Type: {{ log.type }}</p>
            <p>Value: {{ log.value }}</p>
            <p>Currency: {{ log.currency }}</p>
            <p>Description: {{ log.description }}</p>
          </div>
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
