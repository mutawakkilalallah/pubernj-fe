<template>
  <div class="row">
    <div class="col-md-8">
      <h3 class="titlePage">Cetak Surat Jalan</h3>
    </div>
    <div class="col-md-4 text-end">
      <div
        class="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button type="button" class="btn btn-danger" v-if="notSync">
          Not Connected
        </button>
        <button type="button" class="btn btn-success" v-else>
          (@{{ auth.user?.username_pedatren }})
        </button>
        <button
          type="button"
          class="btn btn-outline-success"
          v-if="notSync"
          @click="table.setOpenLogin"
        >
          <font-awesome-icon icon="right-to-bracket" />
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          v-else
          @click="table.hapusPedatren(auth.user.uuid)"
        >
          <font-awesome-icon icon="trash" />
        </button>
        <button
          type="button"
          class="btn btn-outline-info"
          :disabled="notSync"
          @click="table.syncPedatren(auth.user.uuid)"
        >
          <font-awesome-icon icon="rotate" /> Sync
        </button>
      </div>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col" v-if="access.wilayah()">
      <h6 class="text-primary">NOTE :</h6>
      <ul>
        <li class="text-primray">
          Data yang di tampilkan adalah data yang akan di proses perizinan ke
          PEDATREN
        </li>
      </ul>
      <hr />
      <div class="filter-box row">
        <div class="col-md-4" v-if="access.notInternal()">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsIzin.wilayah"
            @change="table.getBlokIzin"
          >
            <option value="" selected>Semua Wilayah</option>
            <option
              v-for="w in table.filterIzin.wilayah"
              :key="w"
              :value="w.alias_wilayah"
            >
              {{ w.wilayah }}
            </option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            :disabled="table.paramsIzin.wilayah === ''"
            v-model="table.paramsIzin.blok"
            @change="table.getDataIzin"
          >
            <option value="" selected>Semua Daerah</option>
            <option
              v-for="b in table.filterIzin.blok"
              :key="b"
              :value="b.id_blok"
            >
              {{ b.blok }}
            </option>
          </select>
        </div>
      </div>
      <div class="serach-box row mt-2 mb-3">
        <div class="col-md-6 d-flex">
          <div class="col-auto me-3">
            <select
              class="form-select form-select-sm"
              v-model="table.paramsIzin.limit"
              @change="table.getDataIzin"
            >
              <option value="50" selected>50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div class="col-auto">
            <div class="form-control-plaintext form-control-sm">
              Total data {{ table.metaIzin["x_total_data"] }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row justify-content-end">
            <div class="col-md-4">
              <input
                type="text"
                v-model="table.paramsIzin.cari"
                class="form-control form-control-sm"
                placeholder="Cari ..."
                @update:model-value="table.getDataIzin"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-sm btn-outline-warning mt-2 mb-3 me-3"
        :disabled="notSync"
        @click="table.getLog"
      >
        <font-awesome-icon icon="triangle-exclamation" /> View Error Log
      </button>
      <button
        class="btn btn-sm btn-outline-info mt-2 mb-3"
        :disabled="notSync"
        @click="table.generateIzin"
      >
        <font-awesome-icon icon="paper-plane" /> Proses Izin
      </button>
      <div v-if="table.loading" class="text-center mb-3">
        <div class="spinner-border text-primary mb-1" role="status"></div>
        <p>Sedang Memproses Data ...</p>
      </div>
      <div class="text-center" v-if="table.successIzin">
        <p>
          <small class="text-dark"
            ><b>Dikirim</b> : {{ table.logIzin?.send }} Data</small
          >
          |
          <small class="text-warning"
            ><b>Diproses</b> : {{ table.logIzin?.process }} Data</small
          >
          |
          <small class="text-success"
            ><b>Berhasil</b> : {{ table.logIzin?.success }} Data</small
          >
          |
          <small class="text-danger"
            ><b>Gagal</b> : {{ table.logIzin?.failed }} Data</small
          >
        </p>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIUP</th>
              <th>Nama</th>
              <th>Daerah</th>
              <th>Wilayah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in table.itemsIzin">
              <td>{{ i + 1 }}</td>
              <td>{{ d?.santri?.niup }}</td>
              <td>{{ d?.santri?.nama_lengkap }}</td>
              <td>{{ d?.santri?.blok }}</td>
              <td>{{ d?.santri?.wilayah }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col" v-if="access.biktren()">
      <h6 class="text-primary">NOTE :</h6>
      <ul>
        <li class="text-primray">
          Data yang di tampilkan adalah data yang akan di proses konfirmasi
          Perizinan di PEDATREN
        </li>
      </ul>
      <hr />
      <div class="filter-box row">
        <div class="col-md-4" v-if="access.notInternal()">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsKonfir.wilayah"
            @change="table.getBlokKonfir"
          >
            <option value="" selected>Semua Wilayah</option>
            <option
              v-for="w in table.filterSurat.wilayah"
              :key="w"
              :value="w.alias_wilayah"
            >
              {{ w.wilayah }}
            </option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            :disabled="table.paramsKonfir.wilayah === ''"
            v-model="table.paramsKonfir.blok"
            @change="table.getDataKonfir"
          >
            <option value="" selected>Semua Daerah</option>
            <option
              v-for="b in table.filterSurat.blok"
              :key="b"
              :value="b.id_blok"
            >
              {{ b.blok }}
            </option>
          </select>
        </div>
      </div>
      <div class="serach-box row mt-2 mb-3">
        <div class="col-md-6 d-flex">
          <div class="col-auto me-3">
            <select
              class="form-select form-select-sm"
              v-model="table.paramsKonfir.limit"
              @change="table.getDataKonfir"
            >
              <option value="50" selected>50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div class="col-auto">
            <div class="form-control-plaintext form-control-sm">
              Total data {{ table.metaKonfir["x_total_data"] }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row justify-content-end">
            <div class="col-md-4">
              <input
                type="text"
                v-model="table.paramsKonfir.cari"
                class="form-control form-control-sm"
                placeholder="Cari ..."
                @update:model-value="table.getDataKonfir"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-sm btn-outline-primary mt-2 mb-3"
        :disabled="notSync"
        @click="table.konfirIzin"
      >
        <font-awesome-icon icon="check-double" /> Konfirmasi BIKTREN
      </button>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIUP</th>
              <th>Nama</th>
              <th>Daerah</th>
              <th>Wilayah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in table.itemsKonfir">
              <td>{{ i + 1 }}</td>
              <td>{{ d?.santri?.niup }}</td>
              <td>{{ d?.santri?.nama_lengkap }}</td>
              <td>{{ d?.santri?.blok }}</td>
              <td>{{ d?.santri?.wilayah }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col" v-if="access.wilayah()">
      <h6 class="text-primary">NOTE :</h6>
      <ul>
        <li class="text-primray">
          Data yang di tampilkan adalah data yang akan di proses cetak Surat
          Izin
        </li>
      </ul>
      <hr />
      <div class="filter-box row">
        <div class="col-md-4" v-if="access.notInternal()">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsSurat.wilayah"
            @change="table.getBlokSurat"
          >
            <option value="" selected>Semua Wilayah</option>
            <option
              v-for="w in table.filterSurat.wilayah"
              :key="w"
              :value="w.alias_wilayah"
            >
              {{ w.wilayah }}
            </option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            :disabled="table.paramsSurat.wilayah === ''"
            v-model="table.paramsSurat.blok"
            @change="table.getDataSurat"
          >
            <option value="" selected>Semua Daerah</option>
            <option
              v-for="b in table.filterSurat.blok"
              :key="b"
              :value="b.id_blok"
            >
              {{ b.blok }}
            </option>
          </select>
        </div>
        <div class="col-md-4" v-if="access.notInternal()">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsSurat.cetak"
            @change="table.getDataSurat"
          >
            <option value="">Semua Status Cetak</option>
            <option value="T" selected>Belum Cetak Surat</option>
            <option value="Y">Sudah Pernah Cetak Surat</option>
          </select>
        </div>
      </div>
      <div class="serach-box row mt-2 mb-3">
        <div class="col-md-6 d-flex">
          <div class="col-auto me-3">
            <select
              class="form-select form-select-sm"
              v-model="table.paramsSurat.limit"
              @change="table.getDataSurat"
            >
              <option value="50" selected>50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div class="col-auto me-3">
            <div class="form-control-plaintext form-control-sm">
              Total data {{ table.metaSurat["x_total_data"] }}
            </div>
          </div>
          <div class="col-auto">
            <button
              class="btn btn-sm btn-primary"
              @click="aktifMemilih = !aktifMemilih"
            >
              <font-awesome-icon icon="check-square" /> Aktifkan Memilih
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row justify-content-end">
            <div class="col-md-4">
              <input
                type="text"
                v-model="table.paramsSurat.cari"
                class="form-control form-control-sm"
                placeholder="Cari ..."
                @update:model-value="table.getDataSurat"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-sm btn-outline-secondary mt-2 mb-3"
        v-if="!table.btnPrint"
        :disabled="notSync && table.btnPrint"
        @click="generatePDF"
      >
        <font-awesome-icon icon="print" /> Print
      </button>
      <button
        class="btn btn-sm btn-danger mt-2 mb-3"
        disabled
        v-if="table.btnPrint"
      >
        <font-awesome-icon icon="stopwatch" /> Loading ...
      </button>
      <button
        class="btn btn-sm btn-outline-success ms-3 mt-2 mb-3"
        v-if="aktifMemilih"
        :disabled="itemDipilih.length < 1"
        @click="prosesData"
      >
        <font-awesome-icon icon="check-double" /> Sudah Cetak
      </button>
      <br />
      <b v-if="table.errorSurat.length > 0">List Error : </b>
      <ul>
        <li v-for="e in table.errorSurat" class="text-danger">
          {{ `Santri dengan NIUP "${e}" tidak dapat di proses cetak surat` }}
        </li>
      </ul>
      <p v-if="table.errorSurat.length > 0" class="badge bg-success fst-italic">
        Coba <b>Refresh Ulang</b> Pastikan tidak ada error sebelum cetak surat
      </p>
      <div :class="isMobile ? 'table-responsive myTable' : 'table-responsive'">
        <table class="table">
          <thead>
            <tr>
              <th v-if="aktifMemilih">
                <input
                  type="checkbox"
                  :checked="semuaTerpilih"
                  @click="pilihSemua"
                />
              </th>
              <th>No</th>
              <th>NIUP</th>
              <th>Nama</th>
              <th>Daerah</th>
              <th>Wilayah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in table.itemsSurat">
              <td v-if="aktifMemilih">
                <input
                  type="checkbox"
                  :id="d.id"
                  :value="d.persyaratan.id"
                  v-model="itemDipilih"
                />
              </td>
              <td>{{ i + 1 }}</td>
              <td>{{ d?.santri?.niup }}</td>
              <td>{{ d?.santri?.nama_lengkap }}</td>
              <td>{{ d?.santri?.blok }}</td>
              <td>{{ d?.santri?.wilayah }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Modal Sinkronasi PEDATREN -->
  <div
    class="modal fade"
    v-if="table.openLogin === true"
    :class="{ show: table.openLogin }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">PEDATREN</h1>
          <button
            class="btn-close"
            type="button"
            @click="table.setOpenLogin"
          ></button>
        </div>
        <form @submit.prevent="table.loginPedatren(auth.user.uuid)">
          <div class="modal-body">
            <div class="text-center">
              <img
                src="https://nuruljadid.app/img/logo.faa9427b.png"
                alt="pedatren-logo"
                class="mb-2"
              />
              <h3>PEDATREN</h3>
              <p>(Pengelolaan Data Pesantren)</p>
            </div>
            <div class="form-group mb-3">
              <input
                type="text"
                class="form-control mt-2"
                placeholder="Username"
                v-model="table.form.username"
              />
            </div>
            <div class="form-group mb-3">
              <input
                type="password"
                class="form-control mt-2"
                placeholder="Password"
                v-model="table.form.password"
              />
            </div>
            <button type="submit" class="btn w-100 btn-sm btn-info">
              Login
            </button>
          </div>
        </form>
        <div class="text-center mb-2">
          <p>Nurul Jadid &copy; 2017 - 2023</p>
          <i>Developed by</i>
          <br />
          <i>@alfianwahid @didinfakhrudin</i>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="table.setOpenLogin"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- View Log -->
  <div
    class="modal fade modal-xl"
    v-if="table.openLog === true"
    :class="{ show: table.openLog }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">
            Log Error PEDATREN
          </h1>
          <button
            class="btn-close"
            type="button"
            @click="table.setOpenLog"
          ></button>
        </div>
        <div class="modal-body">
          <button class="btn btn-sm btn-danger mb-3">
            Total Error PEDATREN <b>[{{ table.itemsLog.length }}]</b>
          </button>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>No</th>
                  <th>Pesan</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(log, i) in table.itemsLog" :key="log">
                  <td>
                    <button class="btn btn-sm btn-danger">
                      <font-awesome-icon icon="trash" />
                    </button>
                  </td>
                  <td>{{ i + 1 }}</td>
                  <td class="text-danger fw-bold">{{ log.message }}</td>
                  <td>{{ toTglIndo(log.createdAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="table.setOpenLog"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useSuratJalanTable } from "../../store/surat-jalan/table";
import { useAuthStore } from "../../store/auth";
import * as access from "../../plugins/access";
import { DateTime } from "luxon";
import jsPDF from "jspdf";
import { api } from "../../plugins/axios";

const isMobile = ref("");

const table = useSuratJalanTable();
const auth = useAuthStore();

const aktifMemilih = ref(false);
const itemDipilih = ref([]);

// Menghitung apakah semua item telah dicentang
const semuaTerpilih = computed(() => {
  return itemDipilih.value.length === table.itemsSurat.length;
});

// Function untuk toggle semua item
const pilihSemua = () => {
  if (semuaTerpilih.value) {
    itemDipilih.value = [];
  } else {
    itemDipilih.value = table.itemsSurat.map((item) => item.persyaratan.id);
  }
};

const prosesData = async () => {
  try {
    await api.put("surat-jalan/status-cetak", {
      status: "Y",
      id_persyaratan: itemDipilih.value,
    });
    itemDipilih.value = [];
    aktifMemilih.value = false;
    table.getDataSurat();
  } catch (err) {}
};

const toTglIndo = (tgl) => {
  const dateTimeWIB = DateTime.fromISO(tgl, { zone: "Asia/Jakarta" });
  return dateTimeWIB.toFormat("dd LLL yyyy HH:mm");
};
const tglCetak = () => {
  const dateTimeWIB = DateTime.fromISO(new Date().toISOString(), {
    zone: "Asia/Jakarta",
  });
  return dateTimeWIB.toFormat("dd LLL yyyy HH:mm:ss");
};

const notSync =
  auth.user.username_pedatren === null && auth.user.password_pedatren === null;

const generatePDF = () => {
  const pageWidth = 16.5; // Lebar dalam cm
  const pageHeight = 21; // Tinggi dalam cm

  const doc = new jsPDF({
    orientation: "portrait", // Atur orientasi ke potret (tinggi lebih besar dari lebar)
    unit: "cm", // Satuan ukuran dalam cm
    format: [pageWidth, pageHeight], // Atur ukuran kertas
  });
  // Tambahkan header (gambar)
  table.itemsSurat.forEach((item, index) => {
    if (index > 0) {
      doc.addPage();
    }

    doc.addImage(table.kop, "PNG", 1, 0.5, 14.5, 3);

    doc.setFont("Helvetica");
    doc.setFontSize(8);
    doc.text("SURAT IZIN LIBUR MAULID 1445 H", 8.25, 3.8, {
      align: "center",
    });

    // Tambahkan nomor surat
    doc.setFont("Helvetica");
    doc.setFontSize(8);
    doc.text(
      `NOMOR : NJ-B/0605/A.IX/09.2023
`,
      8.25,
      4.2,
      { align: "center" }
    );

    // Tambahkan paragraf
    doc.text(
      `Yang bertanda tangan dibawah ini, Kepala Pondok Pesantren Nurul Jadid Paiton Probolinggo Jawa Timur `,
      1,
      4.8
    );
    doc.text(`memberikan izin libur kepada :`, 1, 5.3);

    // Tambahkan biodata
    doc.text(`NIUP`, 1, 5.8);
    doc.text(`:`, 4, 5.8);
    doc.text(`${item.santri.niup}`, 4.2, 5.8);
    doc.text(`Nama`, 1, 6.2);
    doc.text(`:`, 4, 6.2);
    doc.text(`${item.santri.nama_lengkap}`, 4.2, 6.2);
    doc.text(`Wilayah`, 1, 6.6);
    doc.text(`:`, 4, 6.6);
    doc.text(`${item.santri.wilayah}`, 4.2, 6.6);
    doc.text(`Daerah`, 1, 7);
    doc.text(`:`, 4, 7);
    doc.text(`${item.santri.blok}`, 4.2, 7);
    doc.text(`Alamat`, 1, 7.4);
    doc.text(`:`, 4, 7.4);
    doc.text(
      `${item.santri.kecamatan}, ${item.santri.kabupaten}, ${item.santri.provinsi}`,
      4.2,
      7.4
    );

    doc.text(
      `Santri putri tanggal 9 Rabi’ul Awal 1445 H/25 September 2023 M`,
      8.25,
      8,
      { align: "center" }
    );
    doc.text(`s.d 18 Rabi’ul Awal 1445 H/4 Oktober 2023 M.`, 8.25, 8.4, {
      align: "center",
    });
    doc.text(
      `Santri putra tanggal 10 Rabi’ul Awal 1445 H/26 September 2023 M`,
      8.25,
      8.8,
      { align: "center" }
    );
    doc.text(`s.d 19 Rabi’ul Awal 1445 H/5 Oktober 2023 M.`, 8.25, 9.2, {
      align: "center",
    });

    // Tambahkan paragraf lainnya
    doc.text(
      `Demikian surat izin ini dibuat dengan sebenarnya dan untuk digunakan sebagaimana mestinya`,
      1,
      10.1
    );

    doc.text(`Paiton, 17 September 2023 M`, 1, 10.7);
    doc.text(`2 Rabi’ul Awwal 1445 H`, 2, 11.1);
    doc.text("Kepala,", 1, 11.7);

    doc.addImage(table.qr, "PNG", 1, 11.9, 2.5, 2.5);

    doc.text("KH. ABD. HAMID WAHID, M.Ag.", 1, 14.7);
    doc.addImage(table.paraf1, "PNG", 0.5, 14.5, 0.6, 0.6);
    doc.addImage(table.paraf2, "PNG", 5, 14.5, 0.6, 0.6);
    doc.text(
      `NIUP. 31820500002
`,
      1,
      15.1
    );
    doc.setFontSize(6);
    doc.text(`Keterangan:`, 1, 15.7);
    doc.text(`1.`, 1, 16.1);
    doc.text(
      `Kedatangan Santri dan penyerahan surat izin libur ke KAMTIB Wilayah/Daerah selambat-lambatnya`,
      1.2,
      16.1
    );
    doc.text(`pukul 17.00 WIB (Ba’da Maghrib).`, 1.2, 16.5);
    doc.text(`2.`, 1, 16.9);
    doc.text(`Pusat layanan Pulang Bersama;`, 1.2, 16.9);
    doc.text(`a.`, 1.2, 17.3);
    doc.text(`Informasi Umum`, 1.4, 17.3);
    doc.text(`: 0888-307-7077`, 3.3, 17.3);
    doc.text(`b.`, 1.2, 17.7);
    doc.text(`Putra`, 1.4, 17.7);
    doc.text(`: 0896-5479-0122`, 3.3, 17.7);
    doc.text(`c.`, 1.2, 18.1);
    doc.text(`Putri`, 1.4, 18.1);
    doc.text(`: 0822-3105-8592`, 3.3, 18.1);

    doc.addImage(item.qrIzin, "PNG", 12, 17, 2, 2);
    doc.text(`Tanggal Cetak`, 12.1, 19.3);
    doc.text(`${tglCetak()}`, 12.1, 19.6);
    doc.text(`Petugas : ${auth.user.nama_lengkap}`, 12.1, 19.9);
  });

  doc.setProperties({
    title: "Cetak Surat Jalan Libur Maulid",
    zoom: 1.2,
    marginLeft: 10,
  });

  doc.autoPrint();
  window.open(doc.output("bloburl"), "blank");
};

onMounted(() => {
  table.getDataIzin();
  table.getDataKonfir();
  table.getDataSurat();
  table.getWilayahIzin();
  table.getWilayahKonfir();
  table.getWilayahSurat();

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });
});
</script>
<style scoped>
.myTable {
  margin-bottom: 60px;
}
</style>
