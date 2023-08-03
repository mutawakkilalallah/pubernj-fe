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
        <h4>Pulang Bersama</h4>
        <h6>Pondok Pesantren Nurul Jadid</h6>
      </div>
      <form
        @submit.prevent="prosesLogin"
        ref="myForm"
      >
        <input
          v-model="form.username"
          id="username"
          type="text"
          class="form-control mb-2"
          :class="valid1 === true ? 'is-invalid':''"
          placeholder="Username"
          @blur="validInput1(form.username)"
        />
        <input
          v-model="form.password"
          :class="valid2 === true ? 'is-invalid':''"
          id="password"
          type="password"
          class="form-control mb-3"
          placeholder="Password"
          aria-describedby="password"
          @blur="validInput2(form.password)"
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
const myForm = ref(null);
const valid1 = ref(false);
const valid2 = ref(false);
const form = ref({
  username: "",
  password: "",
});
function prosesLogin() {
  validInput1;
  validInput2;
  storeAuth.login(form.value);
  // console.log("my form", myForm);
  // return "ok";
}

function validInput1(msg) {
  if (msg === "") {
    valid1.value = true;
  } else {
    valid1.value = false;
  }
}
function validInput2(msg) {
  if (msg === "") {
    valid2.value = true;
  } else {
    valid2.value = false;
  }
}
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
