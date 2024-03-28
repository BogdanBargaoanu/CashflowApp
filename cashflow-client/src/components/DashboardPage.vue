<template>
    <h1 class="text-center dashboard-heading">Dashboard</h1>
    <div class="container-fluid dashboard">
        <div class="content-box cb1">current-info
        </div>
        <div class="content-box cb2">
            <img src="../assets/dashboard-img/chart-icon.png" alt="chart-icon" class="chart-icon">
        </div>
        <div class="content-box cb3">cashflow
        </div>
        <div class="content-box cb4">categories-graph
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
        }
    }
}
</script>