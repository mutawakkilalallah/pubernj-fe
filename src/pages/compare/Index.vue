<template>
  <h3 class="titlePage">Compare Tagihan E-Bekal</h3>
  <hr />
  <div class="row">
    <div class="col-md-8">
      <h6 class="text-primary">NOTE :</h6>
      <ul>
        <li class="text-primray">
          Data ini adalah data penumpang yang tarifnya tidak sesuai atau berbeda
          dengan tagihan yang ada di <b class="text-primary">"E-Bekal"</b>
        </li>
        <li class="text-primray">
          Kolom <b class="text-info">"BIRU"</b> adalah tagihan
          <b class="text-primary">LEBIH</b> dari tarif, kolom
          <b class="text-warning">"KUNING"</b> adalah tagihan
          <b class="text-primary">KURANG</b> dari tarif,
        </li>
      </ul>
      <hr />
      <div class="filter-box row">
        <div class="col-md-3">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsBeda.wilayah"
            @change="table.getBlokBeda"
          >
            <option value="" selected>Semua Wilayah</option>
            <option
              v-for="w in table.filterBeda.wilayah"
              :key="w"
              :value="w.alias_wilayah"
            >
              {{ w.wilayah }}
            </option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            :disabled="table.paramsBeda.wilayah === ''"
            v-model="table.paramsBeda.blok"
            @change="table.getDataBeda"
          >
            <option value="" selected>Semua Daerah</option>
            <option
              v-for="b in table.filterBeda.blok"
              :key="b"
              :value="b.id_blok"
            >
              {{ b.blok }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsBeda.jenis_kelamin"
            @change="table.getDataBeda"
          >
            <option value="" selected>Semua Jenis Kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsBeda.pembayaran"
            @change="table.getDataBeda"
          >
            <option value="" selected>Semua Status Pembayaran</option>
            <option value="lunas">Lunas</option>
            <option value="lebih">Lebih</option>
            <option value="belum-lunas">Belum Lunas</option>
            <option value="kurang">Kurang</option>
          </select>
        </div>
        <div class="col-md-3">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsBeda.nominal"
            @change="table.getDataBeda"
          >
            <option value="" selected>Semua Nominal Tagihan</option>
            <option value="Y">Tarif & Tagihan Tidak 0</option>
          </select>
        </div>
      </div>
      <div class="serach-box row mt-2 mb-3">
        <div class="col-md-6 d-flex">
          <div class="col-auto me-3">
            <select
              class="form-select form-select-sm"
              v-model="table.paramsBeda.limit"
              @change="table.getDataBeda"
            >
              <option value="100" selected>100</option>
              <option value="250">250</option>
            </select>
          </div>
          <div class="col-auto">
            <div class="form-control-plaintext form-control-sm">
              Total data {{ table.metaBeda["x_total_data"] }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row justify-content-end">
            <div class="col-md-4">
              <input
                type="text"
                v-model="table.paramsBeda.cari"
                class="form-control form-control-sm"
                placeholder="Cari ..."
                @update:model-value="table.getDataBeda"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIUP</th>
              <th>Nama</th>
              <th>Tarif</th>
              <th>Tagihan</th>
              <th>Selisih</th>
              <th>Status</th>
              <th>Jumlah</th>
              <th>Wilayah</th>
              <th>Daerah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in table.itemsBeda">
              <td>{{ i + 1 }}</td>
              <td>
                {{ d?.santri?.niup }}
                <small @click="table.copyNiup(d?.santri?.niup)"
                  ><font-awesome-icon icon="copy" color="#003E1E"
                /></small>
              </td>
              <td>{{ d?.santri?.nama_lengkap }}</td>
              <td>{{ toRupiah(d?.dropspot?.harga) }}</td>
              <td>{{ toRupiah(d?.tagihan_ebekal) }}</td>
              <td
                :class="{
                  'bg-warning': d?.tagihan_ebekal - d?.dropspot?.harga < 0,
                  'bg-info': d?.tagihan_ebekal - d?.dropspot?.harga >= 0,
                }"
              >
                <b>{{ toRupiah(d?.tagihan_ebekal - d?.dropspot?.harga) }}</b>
              </td>
              <td>
                <i
                  v-if="d.status_bayar === 'belum-lunas'"
                  class="badge bg-danger text-capitalize"
                  >{{
                    d.status_bayar === "belum-lunas" ? "belum lunas" : ""
                  }}</i
                >
                <i
                  v-if="d.status_bayar === 'lunas'"
                  class="badge bg-success text-capitalize"
                  >{{ d.status_bayar }}</i
                >
                <i
                  v-if="d.status_bayar === 'kurang'"
                  class="badge bg-warning text-capitalize"
                  >{{ d.status_bayar }}</i
                >
                <i
                  v-if="d.status_bayar === 'lebih'"
                  class="badge bg-info text-capitalize"
                  >{{ d.status_bayar }}</i
                >
              </td>
              <td>{{ toRupiah(d?.jumlah_bayar) }}</td>
              <td>{{ d?.santri?.wilayah }}</td>
              <td>{{ d?.santri?.blok }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-md-4">
      <h6 class="text-primary">NOTE :</h6>
      <ul>
        <li class="text-primray">
          Data ini adalah data yang belum memiliki tagihan di
          <b class="text-primary">"E-Bekal"</b>
        </li>
        <li class="text-primray">
          Data ini sudah tidak termasuk
          <b class="text-primary"
            >"PENGURUS, LAPANGAN AYAMAN, dll." Yang tidak memiliki tarif
            <b class="text-primray">"0"</b></b
          >
        </li>
      </ul>
      <hr />
      <div class="filter-box row">
        <div class="col-md-4">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsNoTagihan.wilayah"
            @change="table.getBlokNoTagihan"
          >
            <option value="" selected>Semua Wilayah</option>
            <option
              v-for="w in table.filterNoTagihan.wilayah"
              :key="w"
              :value="w.alias_wilayah"
            >
              {{ w.wilayah }}
            </option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            :disabled="table.paramsNoTagihan.wilayah === ''"
            v-model="table.paramsNoTagihan.blok"
            @change="table.getDataNoTagihan"
          >
            <option value="" selected>Semua Daerah</option>
            <option
              v-for="b in table.filterNoTagihan.blok"
              :key="b"
              :value="b.id_blok"
            >
              {{ b.blok }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.paramsNoTagihan.jenis_kelamin"
            @change="table.getDataNoTagihan"
          >
            <option value="" selected>Semua Jenis Kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
      </div>
      <div class="serach-box row mt-2 mb-3">
        <div class="col-md-6 d-flex">
          <div class="col-auto me-3">
            <select
              class="form-select form-select-sm"
              v-model="table.paramsNoTagihan.limit"
              @change="table.getDataNoTagihan"
            >
              <option value="100" selected>100</option>
              <option value="250">250</option>
            </select>
          </div>
          <div class="col-auto">
            <div class="form-control-plaintext form-control-sm">
              Total data {{ table.metaNoTagihan["x_total_data"] }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row justify-content-end">
            <div class="col-md-8">
              <input
                type="text"
                v-model="table.paramsNoTagihan.cari"
                class="form-control form-control-sm"
                placeholder="Cari ..."
                @update:model-value="table.getDataNoTagihan"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIUP</th>
              <th>Nama</th>
              <th>Tarif</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in table.itemsNoTagihan">
              <td>{{ i + 1 }}</td>
              <td>{{ d?.santri?.niup }}</td>
              <td>{{ d?.santri?.nama_lengkap }}</td>
              <td>{{ toRupiah(d?.dropspot?.harga) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCompareTable } from "../../store/compare/table";

const table = useCompareTable();

const toRupiah = (harga) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);
};

onMounted(() => {
  table.getDataBeda();
  table.getWilayahBeda();
  table.getDataNoTagihan();
  table.getWilayahNoTagihan();
});
</script>
