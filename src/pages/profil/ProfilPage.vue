<template>
  <!-- judul -->
  <h3 class="titlePage">Profil</h3>
  <hr />
  <div class="my-3 text-center">
    <img
      :src="store.fotoDiri"
      height="200"
      width="200"
      style="object-fit: cover"
      class="rounded-circle"
    />
    <h3 class="mt-3 mb-0">{{ store?.data?.nama_lengkap }}</h3>
    <p>@{{ store.data.username }} | {{ store.data.role }}</p>
    <hr />
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-header text-start">Password</div>
          <div class="card-body text-start">
            <form @submit.prevent="store.updatePassword(store.data.uuid)">
              <input
                type="password"
                placeholder="Password"
                v-model="store.form.password"
                class="form-control form-control-sm mb-2"
              />
              <input
                type="password"
                placeholder="Konfirmasi Password"
                v-model="store.confirm.password"
                class="form-control form-control-sm mb-2"
              />
              <p
                class="text-danger"
                v-if="store.form.password != store.confirm.password"
              >
                Password dan Konfirmasi Password tidak sama
              </p>
              <p class="text-danger" v-if="store.form.password.length < 5">
                Password minimal 5 karakter
              </p>
              <button
                type="submit"
                class="btn btn-success btn-sm"
                :disabled="
                  store.form.password != store.confirm.password ||
                  store.form.password.length < 5
                "
              >
                SIMPAN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProfilStore } from "../../store/profil";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useProfilStore();
store.getDataDetail(route.params.uuid);
</script>
