<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <h3>{{ isEditMode ? 'Edit User' : 'Add User' }}</h3>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" v-model="user.username" class="form-control" id="username" placeholder="username" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="user.email" class="form-control" id="email" placeholder="Email" required />
        </div>
        <div class="form-group" v-if="!isEditMode">
          <label for="password">Password</label>
          <input type="password" v-model="user.password" class="form-control" id="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn btn-primary mr-2">{{ isEditMode ? 'Update' : 'Create' }}</button>
        <button type="submit" class="btn btn-secondary" @click="handleCancel">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          username: '',
          email: '',
          password: '',
        },
      };
    },
    computed: {
      isEditMode() {
        return !!this.$route.params.id;
      },
    },
    methods: {
      async handleSubmit() {
        if (this.isEditMode) {
          await this.$store.dispatch('updateUser', this.user);
        } else {
          await this.$store.dispatch('createUser', this.user);
        }
        this.$router.push('/users');
      },
      handleCancel() {
        this.$router.push('/users');
      }
    },
    async created() {
      if (this.isEditMode) {
        await this.$store.dispatch('fetchUser', this.$route.params.id);
        this.user = { ...this.$store.state.user, password: '' };
      }
    },
  };
  </script>
  