<template>
  <v-container class="fill-height" fluid>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Securities App</v-toolbar-title>
    </v-toolbar>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card class="mx-auto" color="primary" dark>
          <v-card-title>
            Login
          </v-card-title>
          <v-card-actions>
            <v-btn @click="navigateTo('login')" color="secondary">Go to Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mx-auto" color="primary" dark>
          <v-card-title>
            Register
          </v-card-title>
          <v-card-actions>
            <v-btn @click="navigateTo('register')" color="secondary">Go to Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    navigateTo(page) {
      this.$router.push(`/${page}`);
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
