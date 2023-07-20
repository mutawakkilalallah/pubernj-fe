<template>
  <div class="loginPage d-flex justify-content-center align-items-center">
    <div class="boxLogin shadow p-5">
      <div class="text-center">
        <img
          src="/logo.png"
          alt="logo-puber"
          class="appLogo shadow rounded-circle"
        />
      </div>
      <div class="title text-center mb-5 mt-5">
        <h4>Aplikasi Pulang Bersama</h4>
        <h6>Pondok Pesantren Nurul Jadid</h6>
      </div>
      <form @submit.prevent="prosesLogin">
        <input
          v-model="form.username"
          type="text"
          class="form-control mb-2"
          placeholder="Username"
        />
        <input
          v-model="form.password"
          type="password"
          class="form-control mb-3"
          placeholder="Password"
        />

        <button
          v-if="storeAuth.loading === false"
          type="submit"
          class="btn btn-primary btn-block"
          style="width: 100%"
        >
          LOGIN
        </button>
        <app-btn-loading v-else />
      </form>
      <div class="developer text-center mt-5">
        <small>Nurul Jadid &copy; 2023</small>
      </div>
      <div class="developer text-center mt-3">
        <i>developed by:</i>
        <br />
        <i>@mutawakkilalallah @farhandardiri</i>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const storeAuth = useAuthStore();
const form = ref({
  username: "",
  password: "",
});
function prosesLogin() {
  storeAuth.login(form.value);
}

// import axios from "axios";
// export default {
//   data() {
//     return {

//       errorLogin: false,

//       username: "",
//       password: "",
//     };
//   },
//   methods: {
//     async prosesLogin() {
//       if (this.username === "" && this.password === "") {
//         Swal.fire(
//           "Ops !",
//           "harap isi username & password telebih dahulu",
//           "error"
//         );
//       } else {
//         const dataLogin = {
//           username: this.username,
//           password: this.password,
//         };

//         try {
//           const result = await axios.post(
//             "https://puber-api.kildev.my.id/login",
//             dataLogin
//           );

//           localStorage.setItem("token", result.data.token);
//           localStorage.setItem("nama", result.data.data.nama);
//           localStorage.setItem("role", result.data.data.role);
//           this.$router.replace("/");
//         } catch (err) {
//           this.errorLogin = true;
//         }
//       }
//     },
//   },
// };
</script>

<style scoped>
.appLogo {
  position: absolute;
  width: 170px;
  margin-left: -85px;
  margin-top: -150px;
}

.loginPage {
  height: 100vh;
  background-color: #cacaca;
}
.boxLogin {
  width: 400px;
  height: 550px;
  background-color: #fff;
  border-radius: 10px;
}

input {
  border: 0;
  border-bottom: 1px solid #cacaca;
  border-radius: 0;
}

input:focus {
  outline: none;
  box-shadow: none;
}
</style>
