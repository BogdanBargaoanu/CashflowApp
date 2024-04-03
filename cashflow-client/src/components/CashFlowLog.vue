<template>
    <div id="cashflow-log">
        <h1 class="text-center cashflowlog-heading">Cashflow</h1>
        <div class="accordion" id="accordionCashflow">
            <div v-for="(log, index) in cashflowLog" :key="log.idcashflowLog" class="accordion-item cashflow-element"
                :style="{ animationDelay: index / 4 + 's' }">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#collapse' + log.idcashflowLog" aria-expanded="false"
                        :aria-controls="'collapse' + log.idcashflowLog">
                        Transaction ID: {{ log.idcashflowLog }} &nbsp;<b
                            :class="{ 'text-danger': log.type == 'Expense', 'text-success': log.type == 'Income' }">{{
                log.type }}</b>
                        &nbsp;
                        Name: {{ log.name }} Value: {{ log.value }} Currency: {{ log.currency }}
                        Date: {{ log.date }}
                    </button>
                </h2>
                <div :id="'collapse' + log.idcashflowLog" class="accordion-collapse collapse"
                    :aria-labelledby="'heading' + log.idcashflowLog" data-bs-parent="#accordionCashflow">
                    <div class="accordion-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="entityName">Name</label>
                            </div>
                            <select id="entityName" class="name-select form-control" aria-label="Name"
                                aria-describedby="inputGroup-sizing-default" v-model="log.identity"
                                @change="inputChanging()">
                                <option v-for="entity in entities" :key="entity.idEntities" :value="entity.idEntities">
                                    {{
                entity.name }}</option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="typeName">Type</label>
                            </div>
                            <select id="typeName" class="type-select form-control" aria-label="Type"
                                aria-describedby="inputGroup-sizing-default" v-model="log.type"
                                @change="inputChanging()">
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Value</span>
                            </div>
                            <input type="number" class="value-input form-control" aria-label="Value"
                                aria-describedby="inputGroup-sizing-default" v-model="log.value"
                                @change="inputChanging()">
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="currencyName">Currency</label>
                            </div>
                            <select id="currencyName" class="currency-select form-control" aria-label="Currency"
                                aria-describedby="inputGroup-sizing-default" v-model="log.currency"
                                @change="inputChanging()">
                                <option value="RON">RON</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Date</span>
                            </div>
                            <input type="date" class="date-input form-control" aria-label="Value"
                                aria-describedby="inputGroup-sizing-default" v-model="log.date"
                                @change="inputChanging()">
                        </div>
                        <transition name="fade">
                            <button v-if="showButton" @click="updateCashflowLog(log.idcashflowLog)"
                                class="btn btn-primary">Update</button>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn-insert">Insert</button>
    </div>
    <button @click="logout()" class="btn-logout">Logout</button>


    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true"
        :class="{ 'show': showToast }" style="position: absolute; top: 0; right: 0;">
        <div class="toast-header">
            <strong class="me-auto">Notification</strong>
            <button type="button" class="m1-2 mb-1 btn-close fade-in" @click="showToast = false"></button>
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
            toastMessage: '',
            showButton: false,
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
        this.cashflowLog = this.cashflowLog.map(log => ({ ...log, selectedEntityId: log.idEntities }));
    },
    methods: {
        logout() {
            localStorage.removeItem('user-token');
            this.$router.push('/login');
        },
        inputChanging() {
            this.showButton = true;
        }
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

.cashflow-element {
    margin-bottom: 10px;
    animation: slide-up-fade-in 1s ease;
    animation-fill-mode: backwards;
    /* This makes the animation delay apply to the start of the animation, not the end */
}

.fade-enter-from,
.fade-leave-to {
    position: relative;
    width: 75%;
    display: block;
    margin: 3rem auto 2rem auto;
    border-radius: 1.5rem;
    background: linear-gradient(90deg, var(--background-color3) 0%, var(--background-color2) 35%, var(--background-color1) 100%);
    z-index: 1;
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    position: relative;
    width: 75%;
    display: block;
    margin: 3rem auto 2rem auto;
    border-radius: 1.5rem;
    background: linear-gradient(90deg, var(--background-color3) 0%, var(--background-color2) 35%, var(--background-color1) 100%);
    z-index: 1;
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    position: relative;
    width: 75%;
    display: block;
    margin: 3rem auto 2rem auto;
    border-radius: 1.5rem;
    background: linear-gradient(90deg, var(--background-color3) 0%, var(--background-color2) 35%, var(--background-color1) 100%);
    z-index: 1;
    transition: opacity 0.5s ease-in-out;
}
</style>