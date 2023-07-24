<template>
  <!-- judul -->
  <h3>Data Santri</h3>
  <!-- {{ paginate }} -->
  <hr />
  <!-- menu filter -->
  <!-- <div class="filter-box mb-5 row">
    <div class="col-md-2">
      <select
        class="form-select form-select-sm"
        v-model="table.params.area"
        @change="table.getData"
      >
        <option value="" selected>Semua Area</option>
        <option v-for="a in form.isArea" :key="a" :value="a.id">
          {{ a.nama }}
        </option>
      </select>
    </div>
  </div> -->
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <small>Total data {{ table.meta["x_total_data"] }}</small>
    </div>
    <div class="col-md-2 d-flex align-items-center">
      <input
        type="text"
        v-model="table.params.cari"
        class="form-control form-control-sm mb-2"
        placeholder="Cari Santri ..."
        @update:model-value="table.searchPage"
      />
    </div>
  </div>
  <hr />
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">NIUP</th>
          <th scope="col">Nama Lengkap</th>
          <th scope="col">JK</th>
          <th scope="col">Wilayah</th>
          <th scope="col">Daerah</th>
          <th scope="col">Kab/Kota</th>
          <th scope="col">Status Kepulangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          v-for="(d, i) in table.items"
          :key="i"
          @dblclick="table.handleDoubelClick(d.uuid)"
        >
          <td>{{ i + 1 + (table.params.page - 1) * table.params.limit }}</td>
          <td>{{ d.raw.warga_pesantren.niup }}</td>
          <td>{{ d.nama_lengkap }}</td>
          <td>{{ d.raw.jenis_kelamin }}</td>
          <td>
            {{
              d.raw.domisili_santri[d.raw.domisili_santri.length - 1].wilayah
            }}
          </td>
          <td>
            {{ d.raw.domisili_santri[d.raw.domisili_santri.length - 1].blok }}
          </td>
          <td>{{ d.raw.kabupaten }}</td>
          <td>
            <i>{{ d.status_kepulangan }}</i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <app-paginate
    v-if="table.meta['x_total_data']"
    :meta="table.meta"
    :per_page="table.params.limit"
    @set-page="(val) => table.setPage(val)"
    @next="table.nexPage"
    @prev="table.prevPage"
    @last="table.setPage"
    @first="table.setPage"
  />

  <!-- modal detail data -->
  <div
    class="modal fade modal-lg"
    v-if="table.isOpenDetail === true"
    :class="{ show: table.isOpenDetail }"
    style="display: block"
    id="modalDetail"
    tabindex="-1"
    aria-labelledby="modalDetailLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalDetailLabel">Detail Santri</h1>
          <button
            class="btn-close"
            type="button"
            @click="table.isOpenDetail = false"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-sm text-warning fst-italic">
            *) Data ini bersifat secondary, untuk data lebih lanjut silahkan
            lihat di
            <a
              href="https://nuruljadid.app"
              style="text-decoration: none"
              target="_blank"
              class="text-info"
              ><b>PEDATREN</b></a
            >
          </p>
          <div class="row">
            <div class="col-md-8 order-sm-2 order-md-2">
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">NIUP</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="table.item.raw.warga_pesantren.niup"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Nama Lengkap</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="table.item.raw.nama_lengkap"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Tanggal Lahir</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="
                      table.item.raw.tempat_lahir +
                      ', ' +
                      table.item.raw.tanggal_lahir
                    "
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Wilayah</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="
                      table.item.raw.domisili_santri[
                        table.item.raw.domisili_santri.length - 1
                      ].wilayah
                    "
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Daerah</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="
                      table.item.raw.domisili_santri[
                        table.item.raw.domisili_santri.length - 1
                      ].blok
                    "
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Kamar</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="
                      table.item.raw.domisili_santri[
                        table.item.raw.domisili_santri.length - 1
                      ].kamar
                    "
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Kecamatan</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="table.item.raw.kecamatan"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Kabupaten</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="table.item.raw.kabupaten"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Provinsi</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="table.item.raw.provinsi"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4 order-sm-1 order-md-2 mb-5 text-end">
              <img
                :src="table.fotoDiri"
                alt="foto-diri"
                class="img-thumbnail"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">Lihat Data Rombongan</button>
          <button class="btn btn-secondary" @click="table.isOpenDetail = false">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useSantriTable } from "../../store/santri/table";
const table = useSantriTable();

onMounted(() => {
  table.getData();
});
</script>
