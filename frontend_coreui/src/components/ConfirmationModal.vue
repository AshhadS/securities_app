<!-- Modal.vue -->
<template>
    <div v-if="visible" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="confirmAction">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      title: String,
      message: String
    },
    methods: {
      closeModal() {
        this.$emit('close'); // Emit 'close' event
      },
      confirmAction() {
        this.$emit('confirm'); // Emit 'confirm' event
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    background: rgba(0, 0, 0, 0.5);
  }
  
  .modal-dialog {
    margin-top: 10%;
  }
  
  .modal-content {
    background-color: #fff;
  }
  </style>
  