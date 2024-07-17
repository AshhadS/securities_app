<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
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
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:5000/api/users/register', {
            username: this.username,
            email: this.email,
            password: this.password
          });
          
          // Optionally handle successful registration (show message, clear form, etc.)
          console.log('Registration successful:', response.data);
          
          // Redirect or handle successful registration
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration error:', error);
          // Handle registration error (show message, clear form, etc.)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles if needed */
  </style>
  