<template>
    <div>
      <div class="">
        <h4 class="mb-4">Users List</h4>
        <button @click="$router.push('/users/new')" class="btn btn-info"> + Add User</button>
      </div>
      <table class="table table-striped mt-4 table-sm">
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
              <button @click="$router.push(`/users/${user.id}`)" class="btn btn-sm btn-info mr-2">Edit</button>
              <button @click="showDeleteConfirmation(user.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Confirmation Modal -->
      <ConfirmationModal
        :visible="showConfirmation"
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
        @confirm="deleteUser(selectedUserId)"
        @close="cancelDelete"
      />
    </div>
  </template>
  
  <script>
  import ConfirmationModal from './ConfirmationModal.vue';
  
  export default {
    data() {
      return {
        showConfirmation: false,
        selectedUserId: null
      };
    },
    
    computed: {
      users() {
        return this.$store.getters.users;
      },
    },
    components: {
      ConfirmationModal
    },
    methods: {
      showDeleteConfirmation(userId) {
        this.selectedUserId = userId;
        this.showConfirmation = true;
      },
      cancelDelete() {
        this.selectedUserId = null;
        this.showConfirmation = false;
      },
      deleteUser(id) {
        this.$store.dispatch('deleteUser', id);
        this.selectedUserId = null;
        this.showConfirmation = false;
      },
    },
    created() {
      this.$store.dispatch('fetchUsers');
    },
  };
  </script>
  