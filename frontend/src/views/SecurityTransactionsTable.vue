<template>
    <v-container>
      <v-text-field
        v-model="search"
        label="Search"
        class="mb-4"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="transactions"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        :search="search"
        item-key="RECID"
        @update:options="fetchData"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Security Transactions</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-toolbar>
        </template>
       
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        search: '',
        options: {},
        transactions: [],
        totalItems: 0,
        loading: false,
        headers: [
          { text: 'Trade Date', value: 'TRADE_DATE' },
          { text: 'Security Account', value: 'SECURITY_ACCOUNT' },
          { text: 'Account Name', value: 'ACCOUNT_NAME' },
          { text: 'Security Number', value: 'SECURITY_NUMBER' },
          { text: 'Short Name', value: 'SHORT_NAME' },
          { text: 'Transaction Type', value: 'TRANS_TYPE' },
          { text: 'No Nominal', value: 'NO_NOMINAL' },
          { text: 'Price', value: 'PRICE' },
          { text: 'Net Amount Trade', value: 'NET_AMT_TRADE' },
          { text: 'Broker Commissions', value: 'BROKER_COMMS' },
          { text: 'Profit/Loss Sec Ccy', value: 'PROF_LOSS_SEC_CCY' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
      };
    },
    methods: {
      ...mapActions(['fetchTransactions']),
      async fetchData() {
        this.loading = true;
        try {
          const { page, itemsPerPage, sortBy, sortDesc } = this.options;
          const params = {
            page: page || 1,
            pageSize: itemsPerPage || 10,
            sortField: sortBy.length ? sortBy[0] : 'TRADE_DATE',
            sortOrder: sortDesc.length ? (sortDesc[0] ? 'DESC' : 'ASC') : 'ASC',
            search: this.search,
          };
          const { data, total } = await this.fetchTransactions(params);
          this.transactions = data;
          this.totalItems = total;
        } finally {
          this.loading = false;
        }
      },
      editTransaction(item) {
        console.log('Edit transaction:', item);
      },
      deleteTransaction(id) {
        console.log('Delete transaction with ID:', id);
        // Implement delete functionality here
      },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  