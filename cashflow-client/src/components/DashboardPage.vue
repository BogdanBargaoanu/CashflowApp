<template>
    <h1 class="text-center dashboard-heading">Dashboard</h1>
    <div class="container-fluid dashboard">
        <div class="content-box cb1">current-info
            <img src="../assets/dashboard-img/current-info.png" alt="current-info" class="current-info-icon">
        </div>
        <div class="content-box cb2">
            <img src="../assets/dashboard-img/chart-icon.png" alt="chart-icon" class="chart-icon">
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
export default {
    name: 'DashboardPage',
    methods: {
        logout() {
            localStorage.removeItem('user-token');
            this.$router.push('/login');
        },
        cashflowLog() {
            this.$router.push('/cashflow-log');
        }
    }
}
</script>