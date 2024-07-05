<template>
  <v-container>
    <v-data-table :headers="headers" :items="users" item-key="id">
        
    </v-data-table>
  </v-container>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      users: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    async fetchUsers() {
      const response = await authService.getUsers();
      this.users = response.data;
    },
    // async editUser(user) {
    //   // Open a dialog for editing the user details
    //   // Use a dialog component to update user details
    // },
    async deleteUser(id) {
      await authService.deleteUser(id);
      this.fetchUsers();
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
