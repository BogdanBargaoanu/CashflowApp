<template>
    <div id="cashflow-log">
        <h1 class="text-center cashflowlog-heading">Cashflow</h1>
        <div class="accordion" id="accordionExample">
            <div v-for="log in cashflowLog" :key="log.idcashflowLog" class="accordion-item cashflow-element">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#collapse' + log.idcashflowLog" aria-expanded="false"
                        :aria-controls="'collapse' + log.idcashflowLog">
                        Transaction ID: {{ log.idcashflowLog }} &nbsp; <b
                            :class="{ 'text-danger': log.value < 0, 'text-success': log.value >= 0 }">{{ log.type }}</b>
                        &nbsp;
                        Name: {{ log.name }} &nbsp; Value: {{ log.value }} &nbsp; Currency: {{ log.currency }} &nbsp;
                        Date: {{ log.date }}
                    </button>
                </h2>
                <div :id="'collapse' + log.idcashflowLog" class="accordion-collapse collapse"
                    :aria-labelledby="'heading' + log.idcashflowLog" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <select class="name-select" v-model="selectedName">
                            <option v-for="entity in entities" :key="entity.idEntities">{{ entity.name }}</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true"
        :class="{ 'show': showToast }" style="position: absolute; top: 0; right: 0;">
        <div class="toast-header">
            <strong class="me-auto">Notification</strong>
            <button type="button" class="m1-2 mb-1 btn-close" @click="showToast = false"></button>
        </div>
        <div class="toast-body">
            {{ toastMessage }}
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
            entities: [],
            showToast: false,
            toastMessage: ''
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
                localStorage.removeItem('user-token');
                this.toastMessage = 'Invalid login: ' + error.response.data.message;
                this.showToast = true;

                setTimeout(() => {
                    this.showToast = false;
                }, 5000);
                this.$router.push('/login');
                return;
            });

        axios.get('http://localhost:3000/entities')
            .then(response => {
                this.entities = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {

    }
}
</script>

<style scoped>
.app-global {
    height: 90%;
}
#cashflow-log cashflow-element {
    width: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}
</style>