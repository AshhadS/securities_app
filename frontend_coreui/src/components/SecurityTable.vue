<template>
    <div class="mb-5">
      <h4 class="mb-4">Security Data</h4>
      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="pagination.search"
          placeholder="Start typing to search"
          @input="updatePagination"
        />
        <small class="form-text text-muted">Search by any field in the table here</small>
      </div>
      
      <div class="form-inline mb-4">
                
      <div class="form-group">
        <label for="fromDate" class="mr-1"><small>From</small> </label>
        <input
          type="date"
          class="form-control form-control-sm mr-2"
          v-model="filters.fromDate"
          placeholder="From Date"
        />
      </div>
      <div class="form-group">
        <label for="toDate" class="mr-1"><small>To</small></label>
        <input
          type="date"
          class="form-control form-control-sm mr-2"
          v-model="filters.toDate"
          placeholder="To Date"
        />
      </div>
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
        <button @click="updateFilters" class="btn btn-info btn-sm mr-2">Filter</button>
        <button @click="clearFilters" class="btn btn-outline-info btn-sm">Clear</button>
      </div>

      <LoadingIndicator :loading="this.loading" />
      <table class="table table-sm securities-table table-striped">
        <thead>
          <tr>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('TRADE_DATE') }" @click="sortBy('TRADE_DATE')">Trade Date</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('SECURITY_ACCOUNT') }" @click="sortBy('SECURITY_ACCOUNT')">Security Account</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('ACCOUNT_NAME') }" @click="sortBy('ACCOUNT_NAME')">Account Name</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('SECURITY_NUMBER') }" @click="sortBy('SECURITY_NUMBER')">Security Number</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('SHORT_NAME') }" @click="sortBy('SHORT_NAME')">Short Name</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('TRANS_TYPE') }" @click="sortBy('TRANS_TYPE')">Transaction Type</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('RECID') }" @click="sortBy('RECID')">RECID</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('NO_NOMINAL') }" @click="sortBy('NO_NOMINAL')">No Nominal</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('PRICE') }" @click="sortBy('PRICE')">Price</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('NET_AMT_TRADE') }" @click="sortBy('NET_AMT_TRADE')">Net Amount Trade</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('BROKER_COMMS') }" @click="sortBy('BROKER_COMMS')">Broker Commissions</th>
            <th role="button" :class="{isDesc: this.pagination.sortOrder, sorted: this.isSorted('PROF_LOSS_SEC_CCY') }" @click="sortBy('PROF_LOSS_SEC_CCY')">Prfit/Loss Sec CCY</th>
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
        <button class="btn btn-info mr-2 btn-sm" @click="exportPDF">Export to PDF</button>
        <select class="form-control-sm form-control mr-2 items-pp ml-auto " v-model="pagination.itemsPerPage" @change="updatePagination">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <div class="d-flex flex-row pagination align-items-center">
          <button class="btn btn-info mr-2 btn-sm" @click="changePage(pagination.page - 1)" :disabled="pagination.page === 1">{{"<"}}</button>
          <span class="mr-2 current-page">Page {{ pagination.page }}</span>
          <button class="btn btn-info btn-sm" @click="changePage(pagination.page + 1)" :disabled="disableNext()">{{">"}}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import LoadingIndicator from './LoadingIndicator';
  
  export default {
    data() {
      return {
        totalPages: 1,
        filters: {
          fromDate: '',
          toDate: '',
          portfolioNumber: '',
          shareSymbol: '',
          securityCurrency: '',
          search: ''
        }
      };
    },
    components: {
      LoadingIndicator
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
        this.changePage(1);
        this.setPagination({ filters: this.filters });
      },
      clearFilters() {
        this.filters = {
          fromDate: '',
          toDate: '',
          portfolioNumber: '',
          shareSymbol: '',
          securityCurrency: ''
        };
        this.pagination.search = '';
        this.updateFilters();
      },
      changePage(page) {
        const allPages = Math.ceil(this.totalData / this.pagination.itemsPerPage);

        if (page > 0 && page <= allPages) {
          this.setPagination({ page });
        }
      },
      sortBy(column) {
        if (this.pagination.sortField === column) {
          this.setPagination({ sortOrder: !this.pagination.sortOrder });
        } else {
          this.setPagination({ sortField: column, sortOrder: false });
        }
      },
      isSorted(column) {
        return this.pagination.sortField == column;
      },
      disableNext() {
        
        // Doesn't have items to paginate - No items more than items per page
        if(this.totalData < this.pagination.itemsPerPage) {
          return true; // disable next
        } 

        // Has multiple pages - reached the end of all pages
        const allPages = Math.ceil(this.totalData / this.pagination.itemsPerPage);
        if(this.pagination.page >= allPages) {
          return true; // disable next
        }
        
        return false; // fallback enable other scenarios
      },
      exportPDF() {
        const doc = new jsPDF();
        const columns = [
          { header: 'Trade Date', dataKey: 'TRADE_DATE' },
          { header: 'Security Account', dataKey: 'SECURITY_ACCOUNT' },
          { header: 'Account Name', dataKey: 'ACCOUNT_NAME' },
          { header: 'Security Number', dataKey: 'SECURITY_NUMBER' },
          { header: 'Short Name', dataKey: 'SHORT_NAME' },
          { header: 'Transaction Type', dataKey: 'TRANS_TYPE' },
          { header: 'RECID', dataKey: 'RECID' },
          { header: 'No Nominal', dataKey: 'NO_NOMINAL' },
          { header: 'Price', dataKey: 'PRICE' },
          { header: 'Net Amount Trade', dataKey: 'NET_AMT_TRADE' },
          { header: 'Broker Commissions', dataKey: 'BROKER_COMMS' },
          { header: 'Prfit/Loss Sec CCY', dataKey: 'PROF_LOSS_SEC_CCY' },
        ];

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
          head: [columns.map(col => col.header)],
          body: this.securityData.map(data => columns.map(col => data[col.dataKey])),
          styles: {
            fontSize: 6, 
          },
          headStyles: {
            fontSize: 7,
          },
        });
        doc.save('security_data.pdf');
      },
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

  th.sorted,
  th:hover {
    color: grey;
  }

  th.sorted::after {
    content: "^";
    right: -2px;
    position: relative;
  }

  th.isDesc.sorted::after {
    color: #000;
    display: inline-block;
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg); 
    top: -3px;
  }

  </style>
  