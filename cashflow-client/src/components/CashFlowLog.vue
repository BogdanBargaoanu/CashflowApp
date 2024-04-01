<template>
    <div id="cashflow-log">
        <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </div>
      </div>
    </div>
  </div>
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