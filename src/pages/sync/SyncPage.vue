<template>
  <div class="text-center" v-if="table.isLoading === true">
    <div class="spinner-border text-primary mt-2" role="status"></div>
    <h6 class="text-primary">Sinkornasi dengan server PEDATREN ...</h6>
    <hr />
  </div>
  <!-- judul -->
  <h3>Generate Auto Dropspot</h3>
  <div class="table-responsive mb-5">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Kode</th>
          <th scope="col">Mode</th>
          <th scope="col">Cakupan</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><b>v1</b></td>
          <td>Tapal Kuda by Kecamatan</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv1"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kota Pasuruan", "Kab. Pasuruan", "Kab. Jember", "kab. Banyuwangi",
            "Kab. Lumajang", "Kab. Bondowoso",
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td><b>v2</b></td>
          <td>Jawa Timur by Kabupaten</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv2"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kab. Bangkalan", "Kab. Pamekasan", "kab. Sampang", "Kota Surabaya",
            "Kab. Sidoarjo", "Kab. Ngawi", "Kota Madiun", "Kab. Nganjuk", "Kab.
            Kediri", "Kota Kediri", "Kab. Jombang", "Kab. Mojokerto", "Kab.
            Tulungagung", "Kab. Lamongan", "Kab. Tuban", "Kab. Gresik", "Kab.
            Magetan", "Kab. Bojonegoro", "Kab. Malang", "Kota Malang", "Kota
            Batu", "Kab. Blitar",
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td><b>v3</b></td>
          <td>Tapal Kuda by Kecamatan Area Khusus 1</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv3"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kab. Probolinggo", "Kab. Situbondo", "Kab. Sumenep", "Kab. Gresik",
            <b>[ONLY]</b> "Paiton", "Besuki", "Jatibanteng", "Suboh",
            "Sumbermalang", "Mlandingan", "Bungatan", "Arjasa", "Kangayan",
            "Sapeken", "Raas", "Nonggunong", "Gayam", "Sangkapura", "Tambak",
          </td>
        </tr>

        <tr>
          <td>4</td>
          <td><b>v4</b></td>
          <td>Tapal Kuda by Kecamatan Area Khusus 2</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv4"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kota Probolinggo", "Kab. Probolinggo", "Kab. Situbondo",
            <b>[NOT]</b> "Paiton", "Besuki", "Jatibanteng", "Suboh",
            "Sumbermalang", "Mlandingan", "Bungatan",
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td><b>v5</b></td>
          <td>Bali by Kabupaten</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv5"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kab. Buleleng", "Kab. Jembrana", "Kab. Tabanan", "Kab. Badung",
            "Kab. Tuban", "Kab. Gianyar", "Kota Denpasar", "Kab. Karangasem",
            "Kab. Bangli",
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td><b>v6</b></td>
          <td>Jawa Tengah & DIY by Kabupaten</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv6"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kab. Bantul", "Kab. Wonogiri", "Kab. Grobogan", "Kab. Kudus", "Kab.
            Sleman", "Kab. Demak", "Kota Semarang", "Kab. Semarang", "Kab.
            Blora", "Kab. Karanganyar", "Kab. Kebumen", "Kab. Klaten", "Kab.
            Banyumas", "Kab. Pekalongan", "Kab. Purworejo", "Kab. Sragen", "Kab.
            Tegal", "Kab. Temanggung", "Kota Yogyakarta",
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td><b>v7</b></td>
          <td>Banten Only</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv7"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>"Banten",</td>
        </tr>
        <tr>
          <td>8</td>
          <td><b>v8</b></td>
          <td>Jabodetabek Not Banten & Jawa barat</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv8"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kota Adm. Jakarta Pusat", "Kota Adm. Jakarta Utara", "Kota Adm.
            Jakarta Barat", "Kota Adm. Jakarta Selatan", "Kota Adm. Jakarta
            Timur", "Kab. Bekasi", "Kota Bekasi", "Kota Depok", "Kab. Bandung
            Barat", "Kab. Bogor", "Kota Bogor", "Kab. Garut", "Kab. Sukabumi",
            "Kab. Karawang", "Kab. Cirebon",
          </td>
        </tr>
        <tr>
          <td>9</td>
          <td><b>v9</b></td>
          <td>Luar Jawa by Provinsi</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv9"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Nusa Tenggara Timur", "Kepulauan Riau", "Kalimantan Barat",
            "Kalimantan Timur", "Kalimantan Selatan", "Kalimantan Utara",
            "Kalimantan Tengah", "Papua", "Kepulauan Bangka Belitung",
            "Lampung", "Maluku", "Bengkulu", "Jambi", "Riau", "Sulawesi Barat",
            "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara",
            "Sulawesi Utara", "Sumatera Barat", "Sumatera Selatan", "Sumatera
            Utara", "Aceh",
          </td>
        </tr>
        <tr>
          <td>10</td>
          <td><b>v10</b></td>
          <td>Luar Negeri by Negara</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv10"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>"Malaysia", "Thailand",</td>
        </tr>
        <tr>
          <td>11</td>
          <td><b>v11</b></td>
          <td>Paiton Only</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv11"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>"Paiton",</td>
        </tr>
        <tr>
          <td>12</td>
          <td><b>v12</b></td>
          <td>Sumenep & Gresik by Kabupaten</td>
          <td>
            <button
              :disabled="isNotDeveloper"
              class="btn btn-primary"
              @click="table.generatePenumpangv12"
            >
              <font-awesome-icon icon="rotate" class="icon" /> Generate
            </button>
          </td>
          <td>
            "Kab. Sumenep", "Kab. Gresik", <b>[NOT]</b> "Arjasa", "Kangayan",
            "Sapeken", "Raas", "Nonggunong", "Gayam", "Sangkapura", "Tambak",
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3>Syncronize Data dengan PEDATREN</h3>
  <hr />
  <div class="row">
    <div class="col-md-3 mb-3">
      <button
        :disabled="isNotDeveloper"
        class="btn btn-warning w-100"
        @click="table.generateSantri"
      >
        <font-awesome-icon icon="rotate" class="icon" /> Generate - Sync Data
        Santri
      </button>
    </div>
    <div class="col-md-3 mb-3">
      <button
        :disabled="isNotDeveloper"
        class="btn btn-danger w-100"
        @click="table.excludePenumpang"
      >
        <font-awesome-icon icon="rotate" class="icon" /> Exclude - Putra Non
        Siswa
      </button>
    </div>
  </div>
  <div class="row" v-if="table.showSyncButtonPenumpang === true">
    <div
      class="col-md-1"
      v-for="index in parseInt(table.setupPenumpangItems)"
      :key="index"
    >
      <button
        :disabled="isNotDeveloper"
        disabled
        class="btn btn-info w-100"
        @click="table.generatePenumpang(index)"
      >
        Tahap {{ index }}
      </button>
    </div>
  </div>
  <h3><font-awesome-icon icon="rotate" class="icon" /> Update Syncronize</h3>
  <hr />
  <div class="row mb-5">
    <div class="col-md-3">
      <button
        :disabled="isNotDeveloper"
        class="btn btn-warning w-100"
        @click="table.updateSantri"
      >
        <font-awesome-icon icon="rotate" class="icon" /> Update - Sync Data
        Santri
      </button>
    </div>
    <div class="col-md-3">
      <button
        :disabled="isNotDeveloper"
        class="btn btn-warning w-100"
        @click="table.updatePenumpang"
      >
        <font-awesome-icon icon="rotate" class="icon" /> Update - Sync Data
        Penumpang
      </button>
    </div>
    <div class="col-md-3">
      <button
        :disabled="isNotDeveloper"
        class="btn btn-warning w-100"
        @click="table.updateUser"
      >
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
const isNotDeveloper = table.user.santri.nama_lengkap != "Mutawakkil Alallah";
// const form = useDropspotForm();
</script>
