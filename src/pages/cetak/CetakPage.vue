<template>
  <div class="bg-secondary p-3">
    <div class="bg-white text-end p-1 mb-5">
      <button class="btn btn-outline-success" @click="cetak">Cetak</button>
      <button class="btn btn-outline-success" @click="cetakKecil">
        Cetak Kecil
      </button>
    </div>
    <div
      class="bg-white"
      id="kertas"
      style="width: 21.5cm; height: 29cm; margin: 0 auto"
    >
      <img src="/kop.jpg" style="width: 21cm" />
      <p class="fw-bold mt-3 text-center text-decoration-underline">
        SURAT JALAN LIBUR MAULID 1445 H
      </p>
      <p class="mt-5 mx-3">
        Yang bertanda tangan dibawah ini, Pengurus Pondok Pesantren Nurul Jadid
        Paiton Probolinggo Jawa Timur Memberikan izin kepada :
      </p>
      <table class="mx-3">
        <tr>
          <td style="width: 5cm">Nama</td>
          <td>:</td>
          <td>Mutawakkil Alallah</td>
        </tr>
        <tr>
          <td style="width: 5cm">Tetala</td>
          <td>:</td>
          <td>Sumenep, 19 November 2002</td>
        </tr>
        <tr>
          <td style="width: 5cm">Wilayah</td>
          <td>:</td>
          <td>Syekh Jumadil Kubro (01)</td>
        </tr>
        <tr>
          <td style="width: 5cm">Daerah</td>
          <td>:</td>
          <td>Abu Hasan Asy Syadzili (S)</td>
        </tr>
        <tr>
          <td style="width: 5cm">Kamar</td>
          <td>:</td>
          <td>S. 06</td>
        </tr>
      </table>
      <p class="mt-5 mx-3">
        Demikian surat jalan ini dibuat dengan sebenarnya dan untuk digunakan
        sebagaimana mestinya.
      </p>
      <div class="mx-2">
        <Img src="/qr-code.png" width="200" />
      </div>
    </div>
    <div
      class="bg-white"
      id="kertas-kecil"
      style="width: 14.5cm; height: 21.5cm; margin: 0 auto; font-size: 12px"
    >
      <img src="/kop.jpg" style="width: 14cm" />
      <p class="fw-bold mt-3 text-center text-decoration-underline">
        SURAT JALAN LIBUR MAULID 1445 H
      </p>
      <p class="mt-5 mx-3">
        Yang bertanda tangan dibawah ini, Pengurus Pondok Pesantren Nurul Jadid
        Paiton Probolinggo Jawa Timur Memberikan izin kepada :
      </p>
      <table class="mx-3">
        <tr>
          <td style="width: 5cm">Nama</td>
          <td>:</td>
          <td>Mutawakkil Alallah</td>
        </tr>
        <tr>
          <td style="width: 5cm">Tetala</td>
          <td>:</td>
          <td>Sumenep, 19 November 2002</td>
        </tr>
        <tr>
          <td style="width: 5cm">Wilayah</td>
          <td>:</td>
          <td>Syekh Jumadil Kubro (01)</td>
        </tr>
        <tr>
          <td style="width: 5cm">Daerah</td>
          <td>:</td>
          <td>Abu Hasan Asy Syadzili (S)</td>
        </tr>
        <tr>
          <td style="width: 5cm">Kamar</td>
          <td>:</td>
          <td>S. 06</td>
        </tr>
      </table>
      <p class="mt-5 mx-3">
        Demikian surat jalan ini dibuat dengan sebenarnya dan untuk digunakan
        sebagaimana mestinya.
      </p>
      <div class="mx-2">
        <Img src="/qr-code.png" width="100" />
      </div>
    </div>
  </div>
</template>

<script setup>
import print from "print-js";

const cetak = () => {
  print({
    printable: "kertas",
    type: "html",
    css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css",
  });
};
const cetakKecil = () => {
  print({
    printable: "kertas-kecil",
    type: "html",
    css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css",
    font_size: "12px",
  });
};
</script>
