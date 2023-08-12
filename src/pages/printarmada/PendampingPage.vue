<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <h3 class="titlePage">Data Penumpang Armada</h3>
      </div>
      <div class="col-md-4 text-end">
        <button
          v-if="idBus > 0"
          class="btn btn-outline-primary"
          type="button"
          v-print="'#printMe'"
        >Print</button>

      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-3">
        <select
          class="form-select form-select-sm mb-2"
          @change="ambilId"
        >
          <option
            value=""
            selected
          >Pilih Kendaraan</option>
          <option
            v-for="a in table.items"
            :key="a"
            :value="a.id"
          >
            {{ a.nama }}
          </option>
        </select>
      </div>
    </div>

    <div
      class="col-md-12"
      v-if="idBus > 0"
      id="printMe"
    >
      <div class="row">
        <div class="col-md-10">
          <h3>{{ table.namaArmada }}</h3>
          <hr />
          <p class="mb-1">
            <b>Dropspot : </b>{{ table.namaDropspot }}
          </p>
          <p class="mb-1"><b>Pendamping : </b>-</p>
          <p class="mb-1"><b>No. HP : </b>-</p>
          <hr />
          <p class="mb-1">
            <b>Jumlah Penumpang : </b> {{ table.jumlahPenumpang ? table.jumlahPenumpang.length : '' }}
          </p>
        </div>
        <!-- table -->
        <div class="table-responsive">
          <table class="table table-sm table-bordered table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">NIUP</th>
                <th scope="col">Nama</th>
                <th scope="col">Alamat</th>
                <th scope="col">Domisili</th>
                <th scope="col">Lembaga</th>
                <th scope="col">Nomor Wali</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(d, i) in table.armada.penumpang"
                :key="i"
              >
                <td>{{ i + 1 }}</td>
                <td>{{ d.santri.niup }}</td>
                <td>{{ d.santri.nama_lengkap }}</td>
                <td>{{ d.santri.kecamatan + " - " +d.santri.kabupaten }}</td>
                <td>{{ d.santri.blok + " - " + d.santri.wilayah }}</td>
                <td> - </td>
                <td> - </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
    <div
      v-else
      class="text-center pt-lg-5"
    >
      <div
        class="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <font-awesome-icon
          icon="triangle-exclamation"
          class="icon me-2"
          style="font-size: 20px"
        />
        <div>
          Belum memilih kendaraan !!!
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { onMounted, ref } from "vue";
import { usePendampingTable } from "../../store/pendamping/table";
import print from "vue3-print-nb";

const table = usePendampingTable();
table.getData();

const idBus = ref(0);

function ambilId() {
  const pilih = document.querySelector(".form-select");
  const ambil = pilih.value;
  idBus.value = ambil;
  table.getDataDetail(ambil);
}

onMounted(() => {});
</script>
