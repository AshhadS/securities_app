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
        @update:options="handleOptionsUpdate"
        :server-items-length="totalItems"
        :loading="loading"
        :search="search"
        item-key="RECID"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Security Transactions</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-toolbar>
        </template>
       
      </v-data-table>
      <v-btn @click="exportToPdf">Export to PDF</v-btn>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';

  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  
  export default {
    data() {
      return {
        search: '',
        options: {
          page: 1,
          itemsPerPage: 10,
          sortBy: [],
          sortDesc: [],
        },
        pagination: {},
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
            sortField: sortBy.length > 0 ? sortBy[0] : 'TRADE_DATE',
            sortOrder: sortDesc.length > 0 && sortDesc[0] ? 'DESC' : 'ASC',
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
      onPageChange(pagination) {
        this.options.page = pagination.page;
        this.fetchData();
      },
      handleOptionsUpdate(newOptions) {
        // Handle sorting changes
        this.options = newOptions;
        this.fetchData();
      },
      exportToPdf() {
        const doc = new jsPDF();
        const rows = this.transactions.map(trans => [
          trans.TRADE_DATE,
          trans.SECURITY_ACCOUNT,
          trans.ACCOUNT_NAME,
          trans.SECURITY_NUMBER,
          trans.SHORT_NAME,
          trans.TRANS_TYPE,
          trans.RECID,
          trans.NO_NOMINAL,
          trans.PRICE,
          trans.NET_AMT_TRADE,
          trans.BROKER_COMMS,
          trans.PROF_LOSS_SEC_CCY
        ]);

        doc.autoTable({
          head: [this.headers.filter(header => header.value !== 'actions').map(header => header.text)],
          body: rows
        });

        doc.save('export_transactions.pdf');
      }
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  