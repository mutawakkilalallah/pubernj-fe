<template>
  <div class="text-center" v-if="table.isLoading === true">
    <div class="spinner-border text-primary mt-2" role="status"></div>
    <h6 class="text-primary">Sinkornasi dengan server PEDATREN ...</h6>
    <hr />
  </div>
  <!-- judul -->
  <h3>Syncronize Data dengan PEDATREN</h3>
  <hr />
  <div class="row">
    <div class="col-md-3">
      <button class="btn btn-warning w-100" @click="table.getSetupPenumpang">
        <font-awesome-icon icon="rotate" class="icon" /> Setup - Sync Data
        Penumpang
      </button>
    </div>
  </div>
  <hr />
  <div class="row" v-if="table.showSyncButtonPenumpang === true">
    <div
      class="col-md-1"
      v-for="index in parseInt(table.setupPenumpangItems)"
      :key="index"
    >
      <button
        class="btn btn-info w-100"
        @click="table.generatePenumpang(index)"
      >
        Tahap {{ index }}
      </button>
    </div>
  </div>
  <hr />
  <h3><font-awesome-icon icon="rotate" class="icon" /> Update Syncronize</h3>
  <hr />
  <div class="row">
    <div class="col-md-3">
      <button class="btn btn-warning w-100" @click="table.updatePenumpang">
        <font-awesome-icon icon="rotate" class="icon" /> Update - Sync Data
        Penumpang
      </button>
    </div>
    <div class="col-md-3">
      <button class="btn btn-warning w-100" @click="table.updateUser">
        <font-awesome-icon icon="rotate" class="icon" /> Update - Sync Data User
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
// import { useDropspotForm } from "../../store/dropsot/form";
import { useSyncTable } from "../../store/sync/table";

const table = useSyncTable();
// const form = useDropspotForm();
</script>
