<template>
    <div id="cashflow-log">
        <div class="accordion" id="accordionExample">
            <div v-for="log in cashflowLog" :key="log.idcashflowLog" class="accordion-item cashflow-element">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#collapse' + log.idcashflowLog" aria-expanded="false" :aria-controls="'collapse' + log.idcashflowLog">
                        Transaction ID: {{ log.idcashflowLog }} &nbsp; <b :class="{ 'text-danger': log.value < 0, 'text-success': log.value >= 0 }">{{ log.type }}</b> &nbsp; 
                        Name: {{ log.name }} &nbsp; Value: {{ log.value }} &nbsp; Currency: {{ log.currency }} &nbsp; Date: {{ log.date }}
                    </button>
                </h2>
                <div :id="'collapse' + log.idcashflowLog" class="accordion-collapse collapse" :aria-labelledby="'heading' + log.idcashflowLog"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <select class="name-select" v-model="selectedName" >
                            <option v-for="entity in entities" :key="entity.idEntities">{{ entity.name }}</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CashFlowLog',
    data() {
        return {
            cashflowLog: [],
            entities: []
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

        axios.get('http://localhost:3000/entities')
            .then(response => {
                this.entities = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
</script>

<style scoped>
#cashflow-log cashflow-element{
    width: 100%;
}
</style>