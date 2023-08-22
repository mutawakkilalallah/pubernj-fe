<template>
  <!-- judul -->
  <div class="row">
    <div class="col-md-8">
      <h3 class="titlePage">Detail Data Penumpang</h3>
    </div>
    <div class="col-md-4 text-end">
      <button
        class="btn btn-sm btn-outline-secondary"
        type="button"
        @click="backPage"
      >
        Kembali
      </button>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-md-3">
      <img
        :src="table.fotoDiri"
        alt="foto-diri"
        class="img-thumbnail"
        style="height: 300px; object-fit: cover"
      />
    </div>
    <div class="col-md-2">
      <b>NIUP</b>
      <p>{{ table.item.santri ? table.item.santri.niup : "-" }}</p>
      <b>Nama</b>
      <p>{{ table.item.santri ? table.item.santri.nama_lengkap : "-" }}</p>
      <b>Jenis Kelamin</b>
      <p>{{ table.item.santri ? table.item.santri.jenis_kelamin : "-" }}</p>
      <b>Tetala</b>
      <p>
        {{
          table.item.santri
            ? table.item.santri.raw.tempat_lahir +
              ", " +
              table.item.santri.raw.tanggal_lahir
            : "-"
        }}
      </p>
      <b>Umur</b>
      <p>
        {{ table.item.santri ? `${table.item.santri.raw.umur} Tahun` : "-" }}
      </p>
    </div>
    <div class="col-md-2">
      <b>Wilayah</b>
      <p>{{ table.item.santri ? table.item.santri.wilayah : "-" }}</p>
      <b>Daerah</b>
      <p>{{ table.item.santri ? table.item.santri.blok : "-" }}</p>
      <b>Kamar</b>
      <p>
        {{
          table.item.santri
            ? table.item.santri.raw.domisili_santri
              ? table.item.santri.raw.domisili_santri[
                  table.item.santri.raw.domisili_santri.length - 1
                ].kamar
              : "-"
            : "-"
        }}
      </p>
      <b>Lembaga</b>
      <p>
        {{
          table.item.santri
            ? table.item.santri.raw.pendidikan
              ? table.item.santri.raw.pendidikan[
                  table.item.santri.raw.pendidikan.length - 1
                ].lembaga
              : "-"
            : "-"
        }}
      </p>
      <b>Jurusan</b>
      <p>
        {{
          table.item.santri
            ? table.item.santri.raw.pendidikan
              ? table.item.santri.raw.pendidikan[
                  table.item.santri.raw.pendidikan.length - 1
                ].jurusan
              : "-"
            : "-"
        }}
      </p>
    </div>
    <div class="col-md-5">
      <b>Provinsi</b>
      <p>{{ table.item.santri ? table.item.santri.provinsi : "-" }}</p>
      <b>Kabupaten</b>
      <p>{{ table.item.santri ? table.item.santri.kabupaten : "-" }}</p>
      <b>Kecamatan</b>
      <p>{{ table.item.santri ? table.item.santri.kecamatan : "-" }}</p>
      <b>Kode Pos</b>
      <p>
        {{ table.item.santri ? table.item.santri.raw.kodepos : "-" }}
      </p>
      <b>Jalan</b>
      <p>
        {{ table.item.santri ? table.item.santri.raw.jalan : "-" }}
      </p>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header bg-primary text-white">Tujuan</div>
        <div class="card-body">
          <p class="card-title mb-0">Dropspot :</p>
          <b class="card-text">
            {{ table.item.dropspot ? table.item.dropspot.nama : "-" }}
          </b>
          <p class="card-title mb-0 mt-3">Daerah :</p>
          <b class="card-text">
            {{ table.item.dropspot ? table.item.dropspot.area.nama : "-" }}
          </b>
          <p class="card-title mb-0 mt-3">PIC :</p>
          <b class="card-text mb-0">
            {{ table.item.dropspot ? table.item.dropspot.area.pic : "-" }}
          </b>
          <br />
          <b class="card-text">
            {{ table.item.dropspot ? table.item.dropspot.area.no_hp : "-" }}
          </b>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header bg-primary text-white">Pembayaran</div>
        <div class="card-body">
          <p class="card-title mb-0">Tarif :</p>
          <b class="card-text">
            {{
              table.item.dropspot ? formatMinus(table.item.dropspot.harga) : "-"
            }}
          </b>
          <p class="card-title mb-0 mt-3">Jumlah Pembayaran :</p>
          <b class="card-text">
            {{
              table.item.dropspot ? formatMinus(table.item.jumlah_bayar) : "-"
            }}
          </b>
          <p class="card-title mb-0 mt-3">Status Pembayaran :</p>
          <i
            v-if="table.item.status_bayar === 'belum-lunas'"
            class="badge bg-danger"
            >{{ table.item.status_bayar }}</i
          >
          <i
            v-if="table.item.status_bayar === 'lunas'"
            class="badge bg-success"
            >{{ table.item.status_bayar }}</i
          >
          <i
            v-if="table.item.status_bayar === 'kurang'"
            class="badge bg-warning"
            >{{ table.item.status_bayar }}</i
          >
          <i v-if="table.item.status_bayar === 'lebih'" class="badge bg-info">{{
            table.item.status_bayar
          }}</i>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header bg-primary text-white">Armada</div>
        <div class="card-body">
          <p class="card-title mb-0">BUS :</p>
          <b class="card-text">
            {{ table.item.armada ? table.item.armada.nama : "-" }}
          </b>
          <p class="card-title mb-0 mt-3">Pendamping :</p>
          <b class="card-text">
            {{
              table.item.armada
                ? table.item.armada.user
                  ? table.item.armada.user.nama_lengkap
                  : "-"
                : "-"
            }}
          </b>
          <p class="card-title mb-0 mt-3">No. HP :</p>
          <b class="card-text">
            {{
              table.item.armada
                ? table.item.armada.user
                  ? table.item.armada.user.no_hp
                  : "-"
                : "-"
            }}
          </b>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { usePenumpangDetailTable } from "../../store/penumpang/table-detail";
import { useRoute } from "vue-router";
import router from "../../router";
import { useAuthStore } from "../../store/auth/index";

const storeAuth = useAuthStore();
const table = usePenumpangDetailTable();
const route = useRoute();

onMounted(() => {
  table.getDataDetail(route.params.uuid);
});

function backPage() {
  router.push("/penumpang");
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
