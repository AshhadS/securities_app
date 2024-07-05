<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
  },
  watch: {
    // isAuthenticated(newValue) {
    //   if (!newValue) {
    //     this.$router.push('/login');
    //   }
    // },
  },
};
</script>