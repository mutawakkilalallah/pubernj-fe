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
      <p class="fw-bold mt-1 mb-0 text-center text-decoration-underline">
        SURAT IZIN LIBUR MAULID 1445 H
      </p>
      <p class="mt-0 mb-0 text-center">NO : NJ-B/0000/A.IX/09.2023</p>
      <p class="mt-1 mx-3 mb-2">
        Yang bertanda tangan dibawah ini, Pengurus Pondok Pesantren Nurul Jadid
        Paiton Probolinggo Jawa Timur Memberikan izin libur kepada :
      </p>
      <div class="row mx-1">
        <div class="col-md-9">
          <table>
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
        </div>
        <div class="col-md-3 text-center">
          <Img :src="store.qr" width="80" />
        </div>
      </div>
      <p class="fw-bold mt-2 mb-0 text-center text-decoration-underline">
        23 September s.d 03 Oktober 2023 M (Santri Puteri)
      </p>
      <p class="fw-bold mt-0 mb-0 text-center">
        08 Rabiul Awal s.d 18 Rabiul Awal 1445 H
      </p>
      <p class="fw-bold mb-0 text-center text-decoration-underline">
        24 September s.d 04 Oktober 2023 M (Santri Putera)
      </p>
      <p class="fw-bold mt-0 text-center">
        09 Rabiul Awal s.d 19 Rabiul Awal 1445 H
      </p>
      <p class="mt-2 mb-2 mx-3">
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
      <p class="mx-3 mb-0">Kepala,</p>
      <div class="mt-1 ms-3 row align-items-end">
        <div class="col-auto g-0">
          <Img src="/paraf1.png" width="20" />
        </div>
        <div class="col-auto g-0">
          <Img src="/ttd-qr.png" width="80" class="my-1" />
        </div>
        <div class="col-auto g-0">
          <Img src="/paraf2.png" width="20" />
        </div>
      </div>
      <p class="mx-3 mt-0 mb-0 fw-bold">KH. ABD. HAMID WAHID, M.Ag.</p>
      <p class="mx-3 mt-0 mb-2">NIUP. 31820500002</p>
      <div class="keterangan">
        <p class="mb-0 mx-3 fw-bold" style="font-size: 10px">Keterangan :</p>
        <table class="mx-3" style="font-size: 10px">
          <tr>
            <td>1.</td>
            <td>
              Kedatangan Santri dan penyerahan surat izin libur ke KAMTIB
              Wilayah/Daerah selambat-lambatnya
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>pukul 17.00 WIB (Ba’da Maghrib).</td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Pusat layanan Pulang Bersama :</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <table class="mt-0">
                <tr>
                  <td>a.</td>
                  <td>Informasi Umum</td>
                  <td class="col-3">:</td>
                  <td class="col-5">0888-307-7077</td>
                </tr>
                <tr>
                  <td>b.</td>
                  <td>Putra</td>
                  <td class="col-3">:</td>
                  <td class="col-5">0896-5479-0122</td>
                </tr>
                <tr>
                  <td>c.</td>
                  <td>Putri</td>
                  <td class="col-3">:</td>
                  <td class="col-5">0822-3105-8592</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!-- <p class="mx-3 mt-4 mb-0 fst-italic text-end" style="font-family: 10px">
          Tanggal Cetak
        </p>
        <p class="mx-3 mt-0 mb-0 fst-italic text-end" style="font-family: 10px">
          {{ tglCetak }} WIB
        </p> -->
      </div>
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
