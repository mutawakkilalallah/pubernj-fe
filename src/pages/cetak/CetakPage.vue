<template>
  <div class="bg-secondary p-5">
    <div class="bg-white text-end p-1 mb-5">
      <button class="btn btn-outline-success" @click="store.cetak">
        Cetak
      </button>
    </div>
    <div
      class="bg-white"
      id="kertas"
      style="width: 15.5cm; height: 21.5cm; margin: 0 auto; font-size: 11px"
    >
      <img src="/kop.jpg" style="width: 15cm" />
      <p class="fw-bold mt-3 text-center text-decoration-underline">
        SURAT IZIN LIBUR MAULID 1445 H
      </p>
      <p class="mt-3 mx-3">
        Yang bertanda tangan dibawah ini, Pengurus Pondok Pesantren Nurul Jadid
        Paiton Probolinggo Jawa Timur Memberikan izin libur kepada :
      </p>
      <table class="mx-3">
        <tr>
          <td class="col-5">Nama</td>
          <td>:</td>
          <td>{{ store.item.nama_lengkap }}</td>
        </tr>
        <tr>
          <td class="col-5">NIUP</td>
          <td>:</td>
          <td>{{ store.item.niup }}</td>
        </tr>
        <tr>
          <td class="col-5">Wilayah</td>
          <td>:</td>
          <td>{{ store.item.wilayah }}</td>
        </tr>
        <tr>
          <td class="col-5">Daerah</td>
          <td>:</td>
          <td>{{ store.item.blok }}</td>
        </tr>
        <tr>
          <td class="col-5">Alamat</td>
          <td>:</td>
          <td>{{ store.item.alamat }}</td>
        </tr>
      </table>
      <p class="fw-bold mt-3 mb-0 text-center text-decoration-underline">
        23 September s.d 03 Oktober 2023 M (Santri Puteri)
      </p>
      <p class="fw-bold mt-0 text-center">
        08 Rabiul Awal s.d 18 Rabiul Awal 1445 H
      </p>
      <p class="fw-bold mt-3 mb-0 text-center text-decoration-underline">
        24 September s.d 04 Oktober 2023 M (Santri Putera)
      </p>
      <p class="fw-bold mt-0 text-center">
        09 Rabiul Awal s.d 19 Rabiul Awal 1445 H
      </p>
      <p class="mt-3 mx-3">
        Demikian surat izin ini dibuat dengan sebenarnya dan untuk digunakan
        sebagaimana mestinya.
      </p>
      <table class="mx-3">
        <tr>
          <td>Paiton,</td>
          <td>{{ tglTtd }}</td>
          <td>{{ blnTtd }}</td>
          <td>{{ thnTtd }}</td>
          <td>M</td>
        </tr>
      </table>
      <p class="mx-3 mb-0">Kepala Pesantren,</p>
      <div class="mt-1 ms-3">
        <Img :src="store.qr" width="80" class="my-2" />
      </div>
      <p class="mx-3 mt-0 mb-0 fw-bold">K H. ABD. HAMID WAHID, M.Ag.</p>
      <p class="mx-3 mt-0">NIUP. 31820500002</p>
      <p class="mx-3 mt-0 mb-0 fst-italic text-end">Tanggal Cetak</p>
      <p class="mx-3 mt-0 mb-0 fst-italic text-end">{{ tglCetak }} WIB</p>
    </div>
  </div>
</template>

<script setup>
import { useCetakPenumpang } from "../../store/penumpang/cetak-penumpang";
import { useRoute } from "vue-router";
import moment from "moment";

const currentDate = moment().locale("id");
const tglCetak = currentDate.format("DD MMM YYYY HH:mm:ss");
const tglTtd = currentDate.format("DD");
const blnTtd = currentDate.format("MMM");
const thnTtd = currentDate.format("YYYY");

const store = useCetakPenumpang();
const route = useRoute();
store.getDataDetail(route.params.niup);
</script>
