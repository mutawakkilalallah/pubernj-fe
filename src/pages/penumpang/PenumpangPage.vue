<template>
  <!-- judul -->
  <div class="row align-items-center">
    <div class="col-md-2 text-start">
      <h3 class="titlePage">Data Penumpang</h3>
    </div>
    <div class="col-md-10 text-end g-3">
      <button v-if="access.keuangan()" class="btn btn-sm btn-outline-info my-1 mx-1" type="button" @click="form.setOpenCompareTagihan()"><font-awesome-icon icon="file-import" class="icon" /> Import Tagihan E-Bekal</button>
      <button v-if="access.keuangan()" class="btn btn-sm btn-outline-info my-1 mx-1" type="button" @click="form.setOpenImportPembayaran()"><font-awesome-icon icon="file-import" class="icon" /> Import Pembayaran</button>
      <button v-if="access.keuangan()" class="btn btn-sm btn-outline-warning my-1 mx-1" type="button" @click="table.unduhTemplate"><font-awesome-icon icon="download" class="icon" /> Unduh Template</button>
      <button class="btn btn-sm btn-outline-primary" type="button" @click="table.setOpenExport">Export</button>
    </div>
  </div>
  <hr />
  <h6 class="text-primary">NOTE :</h6>
  <ul>
    <li class="text-primary" v-if="access.keuangan">Untuk fitur <b>"Unduh Template"</b> berlaku filter (Wilayah, Daerah, Jenis Kelamin dan Status Pembayaran)</li>
    <li class="text-primary">Filter <b>"Status Persyaratan"</b> hanya aktif ketika filter <b>"Status Pembayaran"</b> bernilai (Lunas / Lebih)</li>
    <li class="text-primary">Ketika Status Pembayaran (Lunas / Lebih) dan Persyaratan (Selesai) maka santri berhak pulang dan dapat di buatkan surat jalan</li>
  </ul>
  <hr />
  <!-- menu filter -->
  <div class="filter-box row">
    <div class="col-md-2" v-if="access.notInternal()">
      <select class="form-select form-select-sm mb-2" v-model="table.params.wilayah" @change="table.getBlok">
        <option value="" selected>Semua Wilayah</option>
        <option v-for="w in table.filter.wilayah" :key="w" :value="w.alias_wilayah">
          {{ w.wilayah }}
        </option>
      </select>
      <select class="form-select form-select-sm mb-2" :disabled="table.params.wilayah === ''" v-model="table.params.blok" @change="table.getData">
        <option value="" selected>Semua Daerah</option>
        <option v-for="b in table.filter.blok" :key="b" :value="b.id_blok">
          {{ b.blok }}
        </option>
      </select>
    </div>
    <div class="col-md-2" v-if="access.notPendamping()">
      <select class="form-select form-select-sm mb-2" v-model="table.params.area" @change="table.getDropspot">
        <option value="" selected>Semua Area</option>
        <option v-for="a in table.filter.area" :key="a" :value="a.id">
          {{ a.nama }}
        </option>
      </select>
      <select class="form-select form-select-sm mb-2" :disabled="table.params.area === ''" v-model="table.params.dropspot" @change="table.getData">
        <option value="" selected>Semua Dropsot</option>
        <option v-for="d in table.filter.dropspot" :key="d" :value="d.id">
          {{ d.nama }}
        </option>
      </select>
    </div>
    <div class="col-md-2">
      <select class="form-select form-select-sm mb-2" v-model="table.params.pembayaran" @change="table.getData">
        <option value="" selected>Semua Status Pembayaran</option>
        <option value="belum-lunas">Belum Lunas</option>
        <option value="lunas">Lunas</option>
        <option value="kurang">Kurang</option>
        <option value="lebih">Lebih</option>
      </select>
      <select class="form-select form-select-sm mb-2" v-model="table.params.hak_pulang" @change="table.getData">
        <option value="" selected>Semua Status Persyaratan</option>
        <option value="Y">Selesai</option>
        <option value="T">Belum Selesai</option>
      </select>
    </div>
    <div class="col-md-2">
      <select class="form-select form-select-sm mb-2" v-model="table.params.jenis_kelamin" @change="table.getData">
        <option value="" selected>Semua Jenis Kelamin</option>
        <option value="L">Laki-Laki</option>
        <option value="P">Perempuan</option>
      </select>
      <select class="form-select form-select-sm mb-2" v-model="table.params.armada" @change="table.getData">
        <option value="" selected>Semua Armada</option>
        <option v-for="a in table.filter.armada" :key="a.id" :value="a.id">
          {{ a.nama }}
        </option>
      </select>
    </div>
    <div class="col-md-2">
      <select class="form-select form-select-sm mb-2" v-model="table.params.tagihan" @change="table.getData">
        <option value="" selected>Semua Tagihan E-Bekal</option>
        <option value="T">Tanpa Tagihan</option>
      </select>
      <select class="form-select form-select-sm mb-2" v-model="table.params.nominal" @change="table.getData">
        <option value="" selected>Semua Nominal Tarif</option>
        <option value="Y">Tarif 0</option>
        <option value="T">Tarif Tidak 0</option>
      </select>
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row mt-2">
    <div class="col-md-6 mb-2 d-flex">
      <div class="col-auto me-3">
        <select class="form-select form-select-sm mb-2" v-model="table.params.limit" @change="table.getData">
          <option value="25" selected>25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div class="col-auto">
        <div class="form-control-plaintext form-control-sm">Total data {{ table.meta["x_total_data"] }}</div>
      </div>
    </div>
    <div class="col-md-6 mb-2">
      <div class="row justify-content-end">
        <div class="col-md-3">
          <input type="text" v-model="table.params.cari" class="form-control form-control-sm mb-2" placeholder="Cari Penumpang ..." @update:model-value="table.searchPage" />
        </div>
        <div class="col-auto d-flex flex-column align-items-end">
          <button class="btn btn-danger btn-sm" @click="table.handleReset">RESET</button>
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-primary" @click="form.showModalTambah" v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">Daftar Rombongan</button>
  <!-- table data utama -->
  <div :class="isMobile ? 'table-responsive myTable' : 'table-responsive'">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">NIUP</th>
          <th scope="col">Nama Santri</th>
          <th scope="col">BPS</th>
          <th scope="col">KOSMARA</th>
          <th scope="col">FA</th>
          <th scope="col">KAMTIB</th>
          <th scope="col" v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">Tarif</th>
          <th scope="col" v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">Jumlah Bayar</th>
          <th scope="col" v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">Status Pembayaran</th>
          <th scope="col">Dropsot</th>
          <th scope="col">Area</th>
          <th scope="col">Wilayah</th>
          <th scope="col">Daerah</th>
          <th scope="col">Kecamatan</th>
          <th scope="col">Kabupaten</th>
          <th scope="col">Provinsi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          v-for="(d, i) in table.items"
          :key="i"
          @dblclick.prevent="form.goToDetail"
          @contextmenu.prevent="form.showContextMenu($event, d)"
          :class="{ 'table-active': isActiveRow(d.id) }"
          @click.prevent="form.showContextMenu($event, d)"
        >
          <td>{{ i + 1 + (table.params.page - 1) * table.params.limit }}</td>
          <td>{{ d.santri.niup }}</td>
          <td>{{ d.santri.nama_lengkap }}</td>
          <td class="text-center" :class="d?.persyaratan?.lunas_bps ? '' : 'table-danger'">
            <font-awesome-icon v-if="d?.persyaratan?.lunas_bps" icon="check" class="icon text-success" />
            <font-awesome-icon v-else icon="times" class="icon text-danger" />
          </td>
          <td class="text-center" :class="d?.persyaratan?.lunas_kosmara ? '' : 'table-danger'">
            <font-awesome-icon v-if="d?.persyaratan?.lunas_kosmara" icon="check" class="icon text-success" />
            <font-awesome-icon v-else icon="times" class="icon text-danger" />
          </td>
          <td class="text-center" :class="d?.persyaratan?.tuntas_fa ? '' : 'table-danger'">
            <font-awesome-icon v-if="d?.persyaratan?.tuntas_fa" icon="check" class="icon text-success" />
            <font-awesome-icon v-else icon="times" class="icon text-danger" />
          </td>
          <td class="text-center" :class="d?.persyaratan?.bebas_kamtib ? '' : 'table-danger'">
            <font-awesome-icon v-if="d?.persyaratan?.bebas_kamtib" icon="check" class="icon text-success" />
            <font-awesome-icon v-else icon="times" class="icon text-danger" />
          </td>
          <td v-if="(d.dropspot && storeAuth.user.role === 'sysadmin') || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">
            {{ formatMinus(d.dropspot.harga) }}
          </td>
          <td v-else-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'" class="text-danger">Rp. 0</td>
          <td v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">
            {{ formatMinus(d.jumlah_bayar) }}
          </td>

          <td v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">
            <i v-if="d.status_bayar === 'belum-lunas'" class="badge bg-danger text-capitalize">{{ d.status_bayar === "belum-lunas" ? "belum lunas" : "" }}</i>
            <i v-if="d.status_bayar === 'lunas'" class="badge bg-success text-capitalize">{{ d.status_bayar }}</i>
            <i v-if="d.status_bayar === 'kurang'" class="badge bg-warning text-capitalize">{{ d.status_bayar }}</i>
            <i v-if="d.status_bayar === 'lebih'" class="badge bg-info text-capitalize">{{ d.status_bayar }}</i>
          </td>
          <td v-if="d.dropspot">{{ d.dropspot.nama }}</td>
          <td v-else class="text-danger"><i>belum-ditentukan</i></td>
          <td v-if="d.dropspot">
            {{ d.dropspot.area.nama }}
          </td>
          <td v-else class="text-danger"><i>belum-ditentukan</i></td>
          <td>
            {{ d.santri.wilayah }}
          </td>
          <td>
            {{ d.santri.blok }}
          </td>
          <td>{{ d.santri.kecamatan }}</td>
          <td>{{ d.santri.kabupaten }}</td>
          <td>{{ d.santri.provinsi }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="table.items.length > 0">
      <app-paginate v-if="table.meta['x_total_data']" :meta="table.meta" :per_page="table.params.limit" @set-page="(val) => table.setPage(val)" @next="table.nexPage" @prev="table.prevPage" @last="table.setPage" @first="table.setPage" />
    </div>
  </div>
  <div
    v-if="form.contextMenuVisible"
    class="context-menu"
    :style="{
      top: `${form.contextMenuPosition.y}px`,
      left: `${form.contextMenuPosition.x}px`,
    }"
  >
    <ul class="list-group list-group-flush">
      <li class="list-group-item px-5" @click="form.handleOpenEditDropspot" v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">
        Ubah Dropsot
      </li>
      <li class="list-group-item px-5" @click="form.handleOpenEditPembayaran" v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'keuangan'">Ubah Status Pembayaran</li>
      <li class="list-group-item px-5" @click="form.goToDetail">Lihat Detail Rombongan</li>
      <li class="list-group-item px-5" @click="form.deleteRombongan" v-if="storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin' || storeAuth.user.role === 'daerah' || storeAuth.user.role === 'wilayah'">Hapus Penumpang</li>
    </ul>
  </div>
  <!-- modal edit data dropspot -->
  <div class="modal fade" v-if="form.isOpenEditDropspot === true" :class="{ show: form.isOpenEditDropspot }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Dropsot</h1>
          <button class="btn-close" type="button" @click="form.setOpenEditDropspot"></button>
        </div>
        <form @submit.prevent="form.editDropspot">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Area</small>
              <select class="form-select" v-model="form.idArea" @change="form.getDropspot">
                <option value="" selected>Pilih Area</option>
                <option v-for="a in form.isArea" :key="a" :value="a.id">
                  {{ a.nama }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Dropspot</small>
              <select class="form-select" v-model="form.formEditDropspot.dropspot_id" :disabled="form.idArea === ''">
                <option v-if="form.formEditDropspot.dropspot_id === ''" value="" selected>Pilih Dropspot</option>
                <option v-for="d in form.isDropspot" :key="d" :value="d.id">
                  {{ d.nama }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" @click="form.setOpenEditDropspot">Tutup</button>
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal edit data pembayaran -->
  <div class="modal fade" v-if="form.isOpenEditPembayaran === true" :class="{ show: form.isOpenEditPembayaran }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Pembayaran</h1>
          <button class="btn-close" type="button" @click="form.setOpenEditPembayaran"></button>
        </div>
        <form @submit.prevent="form.editPembayaran">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Jumlah Pembayaran</small>
              <input type="number" class="form-control mt-2" v-model="form.formEditPembayaran.jumlah_bayar" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" @click="form.setOpenEditPembayaran">Tutup</button>
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal import pembayaran -->
  <div class="modal fade" v-if="form.isOpenImportPembayaran === true" :class="{ show: form.isOpenImportPembayaran }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Import Pembayaran</h1>
          <button class="btn-close" type="button" @click="form.setOpenImportPembayaran"></button>
        </div>
        <form @submit.prevent="form.importPembayaran">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>File Excel (.xlsx only)</small>
              <input type="file" @change="form.handleFileChange" accept=".xls, .xlsx" class="form-control mt-2" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" @click="form.setOpenImportPembayaran">Tutup</button>
            <button type="submit" class="btn btn-sm btn-primary">Proses</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal import compare tagihan -->
  <div class="modal fade" v-if="form.isOpenCompareTagihan === true" :class="{ show: form.isOpenCompareTagihan }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Import Tagihan E-Bekal</h1>
          <button class="btn-close" type="button" @click="form.setOpenCompareTagihan"></button>
        </div>
        <form @submit.prevent="form.compareTagihan">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>File Excel (.xlsx only)</small>
              <input type="file" @change="form.handleFileCompare" accept=".xls, .xlsx" class="form-control mt-2" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" @click="form.setOpenCompareTagihan">Tutup</button>
            <button type="submit" class="btn btn-sm btn-primary">Proses</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal export -->
  <div class="modal fade modal-md" v-if="table.openExport === true" :class="{ show: table.openExport }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Export Data</h1>
          <button class="btn-close" type="button" @click="table.setOpenExport"></button>
        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="table.paramsExp.in_alamat" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">Alamat </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="table.paramsExp.in_dropspot" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">Dropspot </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="table.paramsExp.in_domisili" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">Domisili Santri </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="table.paramsExp.in_pembayaran" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">Pembayaran (Ongkos Rombongan) </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="table.paramsExp.in_persyaratan" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">Persyaratan </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="table.paramsExp.in_armada" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">Armada </label>
          </div>
          <hr />
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="table.paramsExp.in_limit" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">Semua data tanpa dibatasi per halaman </label>
            <br />
            <label class="form-check-label" for="flexCheckDefault">(Bisa membutuhkan waktu yang lama) </label>
          </div>
          <hr />
          <b class="text-danger">Note: Jagalah privasi data. Haram disebar & dipergunakan untuk selain kepentingan pesantren.</b>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="table.export">Export Excel</button>
          <button type="button" class="btn btn-secondary" @click="table.setOpenExport">Tutup</button>
        </div>
      </div>
    </div>
  </div>
  <!-- modal detail -->
  <div class="modal fade modal-xl" v-if="form.isOpen === true" :class="{ show: form.setOpen }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Detail Data Penumpang</h1>
          <button class="btn-close" type="button" @click="form.setOpen"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-3">
              <img :src="form.fotoDiri" alt="foto-diri" class="img-thumbnail" style="height: 300px; object-fit: cover" />
            </div>
            <div class="col-md-2">
              <b>NIUP</b>
              <p>{{ form.person.santri ? form.person.santri.niup : "-" }}</p>
              <b>Nama</b>
              <p>
                {{ form.person.santri ? form.person.santri.nama_lengkap : "-" }}
              </p>
              <b>Jenis Kelamin</b>
              <p>
                {{ form.person.santri ? form.person.santri.jenis_kelamin : "-" }}
              </p>
              <b>Tetala</b>
              <p>
                {{ form.person.santri ? form.person.santri.raw.tempat_lahir + ", " + form.person.santri.raw.tanggal_lahir : "-" }}
              </p>
              <b>Umur</b>
              <p>
                {{ form.person.santri ? `${form.person.santri.raw.umur} Tahun` : "-" }}
              </p>
            </div>
            <div class="col-md-2">
              <b>Wilayah</b>
              <p>{{ form.person.santri ? form.person.santri.wilayah : "-" }}</p>
              <b>Daerah</b>
              <p>{{ form.person.santri ? form.person.santri.blok : "-" }}</p>
              <b>Kamar</b>
              <p>
                {{ form.person.santri ? (form.person.santri.raw.domisili_santri ? form.person.santri.raw.domisili_santri[form.person.santri.raw.domisili_santri.length - 1].kamar : "-") : "-" }}
              </p>
              <b>Lembaga</b>
              <p>
                {{ form.person.santri ? (form.person.santri.raw.pendidikan ? form.person.santri.raw.pendidikan[form.person.santri.raw.pendidikan.length - 1].lembaga : "-") : "-" }}
              </p>
              <b>Jurusan</b>
              <p>
                {{ form.person.santri ? (form.person.santri.raw.pendidikan ? form.person.santri.raw.pendidikan[form.person.santri.raw.pendidikan.length - 1].jurusan : "-") : "-" }}
              </p>
            </div>
            <div class="col-md-5">
              <b>Provinsi</b>
              <p>
                {{ form.person.santri ? form.person.santri.provinsi : "-" }}
              </p>
              <b>Kabupaten</b>
              <p>
                {{ form.person.santri ? form.person.santri.kabupaten : "-" }}
              </p>
              <b>Kecamatan</b>
              <p>
                {{ form.person.santri ? form.person.santri.kecamatan : "-" }}
              </p>
              <b>Kode Pos</b>
              <p>
                {{ form.person.santri ? form.person.santri.raw.kodepos : "-" }}
              </p>
              <b>Jalan</b>
              <p>
                {{ form.person.santri ? form.person.santri.raw.jalan : "-" }}
              </p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-header bg-primary text-white">
                  <div class="float-start">Tujuan</div>
                </div>
                <div class="card-body">
                  <div>
                    <p class="card-title mb-0">Dropspot :</p>
                    <b class="card-text">
                      {{ form.dataEdit.dropspot ? form.dataEdit.dropspot.nama : "-" }}
                    </b>
                    <p class="card-title mb-0 mt-3">Daerah :</p>
                    <b class="card-text">
                      {{ form.person.dropspot ? form.person.dropspot.area.nama : "-" }}
                    </b>
                    <p class="card-title mb-0 mt-3">PIC :</p>
                    <b class="card-text mb-0">
                      {{ form.person.dropspot ? form.person.dropspot.area.pic : "-" }}
                    </b>
                    <br />
                    <b class="card-text">
                      {{ form.person.dropspot ? form.person.dropspot.area.no_hp : "-" }}
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-header bg-primary text-white">
                  <div class="float-start">Pembayaran</div>
                </div>
                <div class="card-body">
                  <div>
                    <div>
                      <p class="card-title mb-0">Tarif :</p>
                      <b class="card-text">
                        {{ form.dataEdit ? formatMinus(form.dataEdit.dropspot.harga) : "-" }}
                      </b>

                      <p class="card-title mb-0 mt-3">Jumlah Pembayaran :</p>
                      <b class="card-text">
                        {{ form ? formatMinus(form.dataEdit.jumlah_bayar) : "-" }}
                      </b>
                      <p class="card-title mb-0 mt-3">Status Pembayaran :</p>
                      <i v-if="form.dataEdit.status_bayar === 'belum-lunas'" class="badge bg-danger">{{ form.dataEdit.status_bayar === "belum-lunas" ? "Belum Lunas" : "" }}</i>
                      <i v-if="form.dataEdit.status_bayar === 'lunas'" class="badge bg-success text-capitalize">{{ form.dataEdit.status_bayar }}</i>
                      <i v-if="form.dataEdit.status_bayar === 'kurang'" class="badge bg-warning text-capitalize">{{ form.dataEdit.status_bayar }}</i>
                      <i v-if="form.dataEdit.status_bayar === 'lebih'" class="badge bg-info text-capitalize">{{ form.dataEdit.status_bayar }}</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-header bg-primary text-white">Armada</div>
                <div class="card-body">
                  <div>
                    <p class="card-title mb-0">BUS :</p>
                    <b class="card-text">
                      {{ form.person.armada ? form.person.armada.nama : "-" }}
                    </b>
                    <p class="card-title mb-0 mt-3">Pendamping :</p>
                    <b class="card-text">
                      {{ form.person.armada ? (form.person.armada.user ? form.person.armada.user.nama_lengkap : "-") : "-" }}
                    </b>
                    <p class="card-title mb-0 mt-3">No. HP :</p>
                    <b class="card-text">
                      {{ form.person.armada ? (form.person.armada.user ? form.person.armada.user.no_hp : "-") : "-" }}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" @click="form.setOpen">Tutup</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade modal-lg" v-if="form.modalTambah === true" :class="{ show: form.showModalTambah }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Daftar Penumpang Penumpang</h1>
          <button class="btn-close" type="button" @click="form.showModalTambah"></button>
        </div>
        <form @submit.prevent="form.daftarRombongan">
          <div class="modal-body">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Pilih Santri" v-model="form.daftarPenumpang.nama_santri" disabled />
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="form.showCariSantri"><font-awesome-icon :icon="['fas', 'pen']" /></button>
            </div>
            <div class="form-group mb-3">
              <small>Area</small>
              <select class="form-select" v-model="form.idArea" @change="form.getDropspot">
                <option value="" selected>Pilih Area</option>
                <option v-for="a in form.isArea" :key="a" :value="a.id">
                  {{ a.nama }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Dropspot</small>
              <select class="form-select" v-model="form.daftarPenumpang.dropspot_id" :disabled="form.idArea === ''">
                <option v-if="form.daftarPenumpang.dropspot_id === ''" value="" selected>Pilih Dropspot</option>
                <option v-for="d in form.isDropspot" :key="d" :value="d.id">
                  {{ d.nama }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
            <button type="button" class="btn btn-sm btn-secondary" @click="form.showModalTambah">Tutup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal fade modal-lg" v-if="form.cariSantri === true" :class="{ show: form.showCariSantri }" style="display: block" id="modalEdit" tabindex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Cari Santri</h1>
          <button class="btn-close" type="button" @click="form.showCariSantri"></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Cari Santri" v-model="form.cari" @keyup="form.getSantri" />
          </div>
          <table class="table table-sm table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">NIUP</th>
                <th scope="col">Nama</th>
                <th scope="col">Kamar</th>
                <th scope="col">Daerah</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(d, i) in form.santri" :key="i" @dblclick.prevent="form.setSantri(d)">
                <td>{{ i + 1 }}</td>
                <td>{{ d?.warga_pesantren?.niup }}</td>
                <td>{{ d?.nama_lengkap }}</td>
                <td>{{ d?.domisili_santri?.kamar }}</td>
                <td>{{ d?.domisili_santri?.blok }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" @click="form.showCariSantri">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePenumpangTable } from "../../store/penumpang/table";
import { usePenumpangForm } from "../../store/penumpang/form";
import { useAuthStore } from "../../store/auth/index";
import * as access from "../../plugins/access";
import { onMounted, ref } from "vue";

const storeAuth = useAuthStore();
const table = usePenumpangTable();
const form = usePenumpangForm();
const isMobile = ref("");

onMounted(() => {
  table.getData();
  form.getArea();

  if (storeAuth.user.role != "p4nj") {
    table.getWilayah();
  }
  table.getArmada();

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });
});

const formatMinus = (i) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(i);
};

const isActiveRow = (id) => {
  const dataid = [];
  dataid.push(id);
  const data = dataid.filter((a) => a === form.idEdit);
  return data[0];
};
</script>

<style>
.context-menu {
  position: absolute;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.context-menu li:hover {
  cursor: pointer;
  background-color: #003e1e;
  color: white;
}
.myTable {
  margin-bottom: 60px;
}
</style>
