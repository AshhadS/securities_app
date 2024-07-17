<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/api/users/login', {
            email: this.email,
            password: this.password
          });
          
          // Assuming the API responds with a token
          const token = response.data.token;
          
          // Store token in local storage
          localStorage.setItem('token', token);
          
          // Redirect or handle successful login
          this.$router.push('/securities');
        } catch (error) {
          console.error('Login error:', error);
          // Handle login error (show message, clear form, etc.)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles if needed */
  </style>
  