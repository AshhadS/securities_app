<template>
    <div class="home">
      <header class="hero">
        <h1>Welcome to the Security Data Management System</h1>
        <p>View & Export your security data efficiently and effectively.</p>
        <button @click="goToSecurityTable">View Security Data</button>
      </header>
      <section class="features">
        <div class="feature">
          <h2>Sign up & Sign in</h2>
          <p>System Login & Register Features.</p>
        </div>
        <div class="feature">
          <h2>User Management</h2>
          <p>Provides creation, update and delete of users.</p>
        </div>
        <div class="feature">
          <h2>Security Data</h2>
          <p>Filterable Sortable & Paginatable Data table.</p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToSecurityTable() {
        this.$router.push('/securities');
      }
    }
  };
  </script>
  
  <style scoped>
  .home {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #333;
  }
  
  .hero {
    padding: 50px;
    background-color: #138496; /* Primary teal background */
    color: white; /* White text */
  }
  
  .hero h1 {
    margin: 0 0 20px;
    font-size: 36px;
  }
  
  .hero p {
    margin: 0 0 30px;
    font-size: 18px;
  }
  
  .hero button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #20c997; /* Light teal background */
    color: white; /* White text */
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .hero button:hover {
    background-color: #198754; /* Darker teal on hover */
  }
  
  .features {
    display: flex;
    justify-content: space-around;
    padding: 50px 0;
    background-color: #f8f9fa; /* Light grey background */
  }
  
  .feature {
    flex: 1;
    padding: 20px;
    background-color: #17a2b8; /* Secondary teal background */
    color: white; /* White text */
    margin: 0 10px;
    text-align: left;
    border-radius: 5px;
    transition: transform 0.3s;
  }
  
  .feature:hover {
    transform: translateY(-10px); /* Slight lift on hover */
  }
  
  .feature h2 {
    margin-top: 0;
    font-size: 24px;
  }
  
  .feature p {
    margin: 10px 0 0;
    font-size: 16px;
  }
  </style>
  