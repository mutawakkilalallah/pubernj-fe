<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <h3 class="titlePage">Data Penumpang Armada</h3>
      </div>
      <div class="col-md-4 text-end g-2">
        <button
          v-if="idBus > 0"
          class="btn btn-outline-primary mx-1"
          type="button"
          v-print="'#printMe'"
        >Print</button>
        <button
          v-if="idBus > 0"
          class="btn btn-outline-warning mx-1"
          type="button"
          v-print="'#printNota'"
        >Print Nota</button>

      </div>
    </div>
    <hr />
    <div class="filter-box row">

    </div>
    <div class="row g-2">
      <div class="col-md-3">
        <select
          class="form-select form-select-sm mb-2"
          v-model="table.params.area"
          @change="table.getDropspot"
        >
          <option
            value=""
            selected
          >Semua Area</option>
          <option
            v-for="a in table.filter.area"
            :key="a"
            :value="a.id"
          >
            {{ a.nama }}
          </option>
        </select>

      </div>
      <div class="col-md-3">
        <select
          class="form-select form-select-sm mb-2"
          :disabled="table.params.area === ''"
          v-model="table.params.dropspot"
          @change="table.getData"
        >
          <option
            value=""
            selected
          >Semua Dropsot</option>
          <option
            v-for="d in table.filter.dropspot"
            :key="d"
            :value="d.id"
          >
            {{ d.nama }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <select
          :disabled="table.params.dropspot === ''"
          class="form-select form-armada form-select-sm mb-2"
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
    >
      <div
        class="row"
        id="printMe"
      >
        <div class="col-md-10">
          <h3>{{ table.namaArmada }}</h3>
          <hr />
          <p class="mb-1">
            <b>Dropspot : </b>{{ table.namaDropspot }}
          </p>
          <p class="mb-1"><b>Pendamping : </b>{{ table.namaPendamping }}</p>
          <p class="mb-1"><b>No. HP : </b>{{ table.noPendamping }}</p>
          <hr />
          <p class="mb-1">
            <b>Jumlah Penumpang : </b> {{ table.jumlahPenumpang ? table.jumlahPenumpang.length : '' }}
          </p>
        </div>
        <!-- table -->
        <div class="table-responsive table-sm ">
          <table class="table table-bordered table-hover mt-3">
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
      <div
        class="row g-0 px-4"
        id="printNota"
      >
        <div class="col-md-4">
          <div class="text-center">
            <img
              src="../../../public/logo-puber.png"
              class="rounded mx-auto d-block"
              style="width: 250px"
              alt="..."
            >
          </div>
        </div>
        <div class="col-md-8">
          <div class="text-center mt-4">
            <h3 class="text-uppercase">pulang bersama maulid 1445 h</h3>
            <h2 class="text-uppercase">pondok pesantren nurul jadid</h2>
            <h6 class="text-uppercase">paiton probolinggo</h6>
          </div>
        </div>
        <div class="col-sm-6 col-md-12 mt-5 p-2">
          <div class="row">
            <div class="col">
              <div class="float-start mt-5">
                <p class="text-capitalize"><strong>Paiton, ................... </strong></p>
                <p class="text-capitalize"><strong>Bendahara Pulang Bersama, </strong></p>
                <br>
                <br>
                <br>
                <p class="text-capitalize"><strong>(............................) </strong></p>

              </div>
            </div>
            <div class="col">
              <div class="text-center">
                <p class="text-capitalize"><strong>area : {{ table.armada ?.dropspot?.area?.nama }} <small>( {{ table.armada ?.dropspot?.nama }} )</small></strong></p>
                <p class="text-capitalize"><strong>type : {{ table.armada ?.type }} <small>({{ table.armada ?.jenis }})</small></strong></p>
                <p class="text-capitalize"><strong>Tarif : {{ table.armada ? formatMinus(table.armada.harga):"-" }}</strong></p>
              </div>
            </div>
            <div class="col">
              <div class="float-end mt-5">
                <br>
                <br>
                <p class="text-capitalize"><strong>Koordinator Armada </strong></p>
                <br>
                <br>
                <br>
                <p class="text-capitalize"><strong>(............................) </strong></p>

              </div>
            </div>
          </div>
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

onMounted(() => {
  table.getDropspot();
});
const idBus = ref(0);

function ambilId() {
  const pilih = document.querySelector(".form-armada");
  const ambil = pilih.value;
  idBus.value = ambil;
  table.getDataDetail(ambil);
}

const formatMinus = (i) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(i);
};
</script>
