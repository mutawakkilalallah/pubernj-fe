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
  <div class="row g-2">
    <div class="col-md-3">
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
    <div class="col-md-3">
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
    <div class="col-md-3">
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
    <div class="col-md-3">
      <div class="card">
        <div class="card-header bg-primary text-white">Persyaratan</div>
        <div class="card-body">
          <div>
            <p class="card-title mb-0">Biaya Pendidikan Santri (BPS) :</p>
            <small
              class="badge bg-success"
              v-if="table?.item?.persyaratan?.lunas_bps"
              >Lunas
            </small>
            <small class="badge bg-danger" v-else>Belum Lunas </small>
          </div>
          <div>
            <p class="card-title mb-0">Kos Makan Santri (KOSMARA) :</p>
            <small
              class="badge bg-success"
              v-if="table?.item?.persyaratan?.lunas_kosmara"
              >Lunas
            </small>
            <small class="badge bg-danger" v-else>Belum Lunas </small>
          </div>
          <div>
            <p class="card-title mb-0">Furudhul Ainiyah (FA) :</p>
            <small
              class="badge bg-success"
              v-if="table?.item?.persyaratan?.tuntas_fa"
              >Tuntas
            </small>
            <small class="badge bg-danger" v-else>Belum Tuntas </small>
          </div>
          <div>
            <p class="card-title mb-0">Bebas Pelanggaran (KAMTIB)</p>
            <small
              class="badge bg-success"
              v-if="table?.item?.persyaratan?.bebas_kamtib"
              >Bebas
            </small>
            <small class="badge bg-danger" v-else>Belum Bebas</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row my-3">
    <div :class="isMobile ? 'myMobile col-md-12' : 'col-md-4'">
      <div class="card">
        <div
          class="card-header bg-primary d-flex justify-content-between align-items-center text-white"
        >
          <p class="mb-0">Mahrom</p>
          <button
            class="btn btn-sm btn-outline-light btn-sm"
            v-if="access.admin()"
            @click="table.setAddMahrom"
          >
            <font-awesome-icon icon="plus" /> Tambah Mahrom
          </button>
        </div>
        <div class="card-body">
          <div class="row align-items-center" v-if="table.item.mahrom">
            <div class="col-md-3">
              <img :src="table?.item?.mahrom?.foto" alt="foto-mahrom" />
            </div>
            <div class="col-md-9">
              <b>{{ table?.item?.mahrom?.santri?.nama_lengkap }}</b>
              <p class="mb-0">
                {{ table?.item?.mahrom?.santri?.niup }}
              </p>
              <p class="mb-2">
                {{
                  `${table?.item?.mahrom?.santri?.blok} / ${table?.item?.mahrom?.santri?.wilayah}`
                }}
              </p>
              <button class="btn btn-sm btn-danger" @click="table.deleteMahrom">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="isMobile ? 'myMobile col-md-12' : 'col-md-8'">
      <div class="card">
        <div
          class="card-header bg-primary d-flex justify-content-between align-items-center text-white"
        >
          <p class="mb-0">Berkas</p>
          <button
            class="btn btn-sm btn-outline-light btn-sm"
            @click="table.setOpenUpload"
            v-if="access.wilayah()"
          >
            <font-awesome-icon icon="upload" /> Upload
          </button>
        </div>
        <div class="card-body">
          <div class="row">
            <div v-for="doc in table.berkas" :key="doc.id" class="col-md-3">
              <div class="card">
                <div class="card-body text-center">
                  <div class="row g-1 justify-content-end">
                    <div class="col-auto">
                      <button
                        class="btn btn-sm btn-secondary"
                        @click="table.openInNewTab(doc.blobUrl)"
                      >
                        <font-awesome-icon icon="eye" class="text-white" />
                      </button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-sm btn-secondary"
                        @click="table.downloadFile(doc)"
                      >
                        <font-awesome-icon icon="download" class="text-white" />
                      </button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-sm btn-danger"
                        @click="table.deleteBerkas(doc.id, route.params.uuid)"
                      >
                        <font-awesome-icon icon="trash" class="text-white" />
                      </button>
                    </div>
                  </div>
                  <img :src="doc.blobUrl" class="p-2 img-fluid" alt="berkas" />
                  <hr />
                  <small class="badge bg-primary">{{
                    doc.type
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  }}</small>
                  <br />
                  <small class="fst-italic text-muted">{{
                    doc.description
                      ? doc.description
                      : "*)Tidak ada deskripsi berkas"
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal add mahrom -->
  <div
    class="modal fade"
    v-if="table.isOpenUpload === true"
    :class="{ show: table.isOpenUpload }"
    style="display: block"
    id="modalUpload"
    tabindex="-1"
    aria-labelledby="modalUploadLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalUploadLabel">Upload Berkas</h1>
          <button
            class="btn-close"
            type="button"
            @click="table.setOpenUpload"
          ></button>
        </div>
        <form @submit.prevent="table.uploadBerkas(route.params.uuid)">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>File</small>
              <input
                type="file"
                @change="table.handleFileChange"
                accept=".jpg, .jpeg, .png"
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>Jenis Berkas</small>
              <select class="form-select mt-2" v-model="table.form.type">
                <option value="" selected>Pilih Jenis Berkas</option>
                <option value="keterangan-pindah-dropspot">
                  Keterangan Pindah Dropspot
                </option>
                <option value="surat-pernyataan">Surat Pernyataan</option>
                <option value="surat-kuasa">Surat Kuasa</option>
                <option value="berkas-pendukung">Berkas Pendukung</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Keterangan (Opsional)</small>
              <textarea
                v-model="table.form.description"
                class="form-control mt-2"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="table.setOpenUpload"
            >
              Tutup
            </button>
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    v-if="table.isAddMahrom === true"
    :class="{ show: table.isAddMahrom }"
    style="display: block"
    id="modalUpload"
    tabindex="-1"
    aria-labelledby="modalUploadLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalUploadLabel">Tambah Mahrom</h1>
          <button
            class="btn-close"
            type="button"
            @click="table.setAddMahrom"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row align-items-center" v-for="d in table.mahrom">
            <div class="col-md-3">
              <img :src="d?.foto" alt="foto-mahrom" />
            </div>
            <div class="col-md-9">
              <b>{{ d?.santri?.nama_lengkap }}</b>
              <p class="mb-0">
                {{ d?.santri?.niup }}
              </p>
              <p class="mb-2">
                {{ `${d.santri?.blok} / ${d.santri?.wilayah}` }}
              </p>
              <button
                class="btn btn-sm btn-primary"
                @click="table.saveMahrom(d.id)"
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="table.setAddMahrom"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { usePenumpangDetailTable } from "../../store/penumpang/table-detail";
import { useRoute } from "vue-router";
import router from "../../router";
import { useAuthStore } from "../../store/auth/index";
import * as access from "../../plugins/access";

const storeAuth = useAuthStore();
const table = usePenumpangDetailTable();
const route = useRoute();
const isMobile = ref("");

function backPage() {
  router.back();
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

onMounted(() => {
  table.getDataDetail(route.params.uuid);

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });
});
</script>
<style scoped>
.myMobile {
  margin-bottom: 60px;
}
</style>
