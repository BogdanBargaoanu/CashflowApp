<template>
<div id="content">
    <form @submit.prevent="register">
      <div class="form">
        <label for="username" class="form-label">Username</label>
        <input type="text" v-model="username" id="username" class="form-control" required>
      </div>
      <div class="form">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="password" id="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>

  <form @submit.prevent="addUser">
      <div class="form">
        <label for="newUsername" class="form-label">New Username</label>
        <input type="text" v-model="newUsername" id="newUsername" class="form-control" required>
      </div>
      <div class="form">
        <label for="newPassword" class="form-label">New Password</label>
        <input type="password" v-model="newPassword" id="newPassword" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Add User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegistrationPage',
  data() {
    return {
      username: '',
      password: '',
      showToast: false,
      toastMessage: ''
    };
  },
  methods: {
    register() {
      axios.post('http://localhost:3000/users/register', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          this.toastMessage = 'Registration successful!';
          this.showToast = true;
          this.$router.push('/login');
        } else {
          this.toastMessage = 'Registration failed: ' + response.data.message;
          this.showToast = true;
        }
      })
      .catch(error => {
        this.toastMessage = 'Error during registration: ' + error.message;
        this.showToast = true;
      });
    },
    addUser() {
      if (this.newUsername.trim() !== "" && this.newPassword.trim() !== "") {
        const newUser = { username: this.newUsername, password: this.newPassword };
        axios.post("http://localhost:3000/users/addUser", newUser)
          .then(response => {
            console.log("User added successfully:", response.data);
           
            this.newUsername = "";
            this.newPassword = "";
          })
          .catch(error => {
            console.error("Error adding user:", error);
           
          });
      } else {
        alert("Please enter valid username and password!");
      }
    }
  }
}
</script>