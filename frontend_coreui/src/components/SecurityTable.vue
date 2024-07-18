<template>
    <div>
      <h2 class="mb-4">Security Data</h2>
      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="pagination.search"
          placeholder="Search"
          @input="updatePagination"
        />
      </div>
      
      <div class="form-inline mb-4">
        <input
          type="date"
          class="form-control form-control-sm mr-2"
          v-model="filters.fromDate"
          placeholder="From Date"
        />
        <input
          type="date"
          class="form-control form-control-sm mr-2"
          v-model="filters.toDate"
          placeholder="To Date"
        />
        <input
          type="text"
          class="form-control form-control-sm mr-2"
          v-model="filters.portfolioNumber"
          placeholder="Portfolio Number"
        />
        <input
          type="text"
          class="form-control form-control-sm mr-2"
          v-model="filters.shareSymbol"
          placeholder="Share Symbol"
        />
        <input
          type="text"
          class="form-control form-control-sm mr-2"
          v-model="filters.securityCurrency"
          placeholder="Security Currency"
        />
        <button @click="updateFilters" class="btn btn-info btn-sm">Filter</button>
      </div>

      <table class="table table-sm securities-table table-striped">
        <thead>
          <tr>
            <th @click="sortBy('TRADE_DATE')">Trade Date</th>
            <th @click="sortBy('SECURITY_ACCOUNT')">Security Account</th>
            <th @click="sortBy('ACCOUNT_NAME')">Account Name</th>
            <th @click="sortBy('SECURITY_NUMBER')">Security Number</th>
            <th @click="sortBy('SHORT_NAME')">Short Name</th>
            <th @click="sortBy('TRANS_TYPE')">Transaction Type</th>
            <th @click="sortBy('RECID')">RECID</th>
            <th @click="sortBy('NO_NOMINAL')">No Nominal</th>
            <th @click="sortBy('PRICE')">Price</th>
            <th @click="sortBy('NET_AMT_TRADE')">Net Amount Trade</th>
            <th @click="sortBy('BROKER_COMMS')">Broker Commissions</th>
            <th @click="sortBy('PROF_LOSS_SEC_CCY')">Prfit/Loss Sec CCY</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in securityData" :key="data.RECID">
            <td>{{ data.TRADE_DATE }}</td>
            <td>{{ data.SECURITY_ACCOUNT }}</td>
            <td>{{ data.ACCOUNT_NAME }}</td>
            <td>{{ data.SECURITY_NUMBER }}</td>
            <td>{{ data.SHORT_NAME }}</td>
            <td>{{ data.TRANS_TYPE }}</td>
            <td>{{ data.RECID }}</td>
            <td>{{ data.NO_NOMINAL }}</td>
            <td>{{ data.PRICE }}</td>
            <td>{{ data.NET_AMT_TRADE }}</td>
            <td>{{ data.BROKER_COMMS }}</td>
            <td>{{ data.PROF_LOSS_SEC_CCY }}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="d-flex">
        <select class="form-control-sm form-control mr-2 items-pp ml-auto " v-model="pagination.itemsPerPage" @change="updatePagination">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <div class="d-flex flex-row pagination align-items-center">
          <button class="btn btn-info mr-2 btn-sm" @click="changePage(pagination.page - 1)" :disabled="pagination.page === 1">{{"<"}}</button>
          <span class="mr-2 current-page">Page {{ pagination.page }}</span>
          <button class="btn btn-info btn-sm" @click="changePage(pagination.page + 1)" :disabled="pagination.page >= totalPages">{{">"}}</button>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        totalPages: 1,
        filters: {
          fromDate: '',
          toDate: '',
          portfolioNumber: '',
          shareSymbol: '',
          securityCurrency: ''
        }
      };
    },
    computed: {
      ...mapState({
        securityData: state => state.securityData,
        totalData: state => state.totalData,
        loading: state => state.loading,
        pagination: state => state.pagination
      })
    },
    watch: {
      totalData(val) {
        this.totalPages = Math.ceil(val / this.pagination.itemsPerPage);
      }
    },
    methods: {
      ...mapActions(['fetchSecurityData', 'setPagination']),
      updatePagination() {
        this.setPagination(this.pagination);
      },
      updateFilters() {
        this.setPagination({ filters: this.filters });
      },
      changePage(page) {
        if (page > 0 && page <= this.totalPages) {
          this.setPagination({ page });
        }
      },
      sortBy(column) {
        if (this.pagination.sortBy === column) {
          this.setPagination({ sortDesc: !this.pagination.sortDesc });
        } else {
          this.setPagination({ sortBy: column, sortDesc: false });
        }
      }
    },
    created() {
      this.fetchSecurityData();
    }
  };
  </script>
  
  <style scoped>
  /* Optional: Customize styles here */
  .securities-table {
    font-size: 10px;
  }

  .current-page {
    font-size: 12px;
  }
  
  .items-pp {
    max-width: 55px;
  }
  </style>
  