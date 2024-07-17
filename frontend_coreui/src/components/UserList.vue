<template>
    <div>
      <button @click="$router.push('/users/new')" class="btn btn-primary">Add User</button>
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="$router.push(`/users/${user.id}`)" class="btn btn-info mr-2">Edit</button>
              <button @click="deleteUser(user.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      users() {
        return this.$store.getters.users;
      },
    },
    methods: {
      deleteUser(id) {
        this.$store.dispatch('deleteUser', id);
      },
    },
    created() {
      this.$store.dispatch('fetchUsers');
    },
  };
  </script>
  