<template>
    <v-container>
      <v-text-field
        v-model="search"
        label="Type any value to search here.."
        class="mb-4"
      ></v-text-field>

      <v-form @submit.prevent="fetchData">
        <v-row>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="filters.fromDate"
              label="From Date"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="filters.toDate"
              label="To Date"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="filters.portfolioNumber"
              label="Portfolio Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="filters.shareSymbol"
              label="Share Symbol"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="filters.securityCurrency"
              label="Security Currency"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn type="submit" color="primary" @click="handleFilter">Filter</v-btn>
          </v-col>
        </v-row>
      </v-form>
      
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
          itemsPerPageOptions: [10, 20, 30]
        },
        filters: {
          // fromDate: '2004-01-01',
          // toDate: '2004-01-31',
          
          fromDate: '',
          toDate: '',
          portfolioNumber: '',
          shareSymbol: '',
          securityCurrency: '',
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
        defaultDate: '2024-01-01'
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
            fromDate: this.filters.fromDate,
            toDate: this.filters.toDate,
            portfolioNumber: this.filters.portfolioNumber,
            shareSymbol: this.filters.shareSymbol,
            securityCurrency: this.filters.securityCurrency,
          };
          const { data, total } = await this.fetchTransactions(params);
          this.transactions = data;
          this.totalItems = total;
        } finally {
          this.loading = false;
        }
      },
      handleOptionsUpdate(newOptions) {
        // Handle sorting changes
        this.options = newOptions;
        console.log(newOptions);
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

         // Add a title
        doc.setFontSize(12);  
        doc.text('Security Transactions', 14, 20); 

        let fromD = this.filters.fromDate?this.filters.fromDate:'-';
        let toD = this.filters.toDate?this.filters.toDate:'-';
        let subtitle = `Statement of Transaction by Date/Currency - From Date: ${fromD} To: ${toD}`
        
        // Add a subtitle
        doc.setFontSize(10); 
        doc.text(subtitle, 14, 30);  

        doc.autoTable({
          startY: 40,
          head: [this.headers.filter(header => header.value !== 'actions').map(header => header.text)],
          body: rows,
          styles: {
            fontSize: 6, // Adjust the font size for the table body
          },
          headStyles: {
            fontSize: 7, // Adjust the font size for the table header
          },
        });

        doc.save('export_transactions.pdf');
      },

      handleFilter() {
        this.fetchData();
      }
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  