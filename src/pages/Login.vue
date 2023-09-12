<template>
  <div
    class="loginPage d-flex justify-content-center align-items-center"
    :style="
      myTheme.themes == 'dark'
        ? 'color: var(--bs-body-color); background-color: #212529;'
        : 'background-color: #cacaca'
    "
  >
    <div
      class="rounded shadow boxForm p-3"
      :style="
        myTheme.themes == 'dark'
          ? 'background-color: var(--bs-body-bg)'
          : 'background-color: #fff'
      "
    >
      <div class="text-center mb-5">
        <img
          src="/logo-puber.png"
          alt="logo-puber"
          class="mb-3"
          width="200"
          height="100"
        />
        <br />
        <h4
          style="color: #01351b"
          class="mb-0"
        >PULANG BERSAMA</h4>
        <small
          style="color: #a47c24"
          class="mt-0"
        >Pondok Pesantren Nurul Jadid</small>
      </div>
      <form
        @submit.prevent="prosesLogin"
        ref="myForm"
      >
        <input
          v-model="form.username"
          id="username"
          type="text"
          class="form-control form-control-sm mb-2"
          :class="valid1 === true ? 'is-invalid' : ''"
          placeholder="Username"
          @blur="validInput1(form.username)"
        />

        <div class="input-group mb-3">

          <input
            v-model="form.password"
            :class="valid2 === true ? 'is-invalid' : ''"
            id="password"
            :type="rePass ? 'text' :'password'"
            class="form-control form-control-sm mb-3"
            placeholder="Password"
            aria-describedby="password"
            @blur="validInput2(form.password)"
          />
          <span
            class="input-group-text"
            id="password"
          >
            <font-awesome-icon
              style="cursor: pointer;"
              :icon="rePass ?'eye': 'eye-slash'"
              @click="readPassword"
            />
          </span>
        </div>
        <button
          v-if="storeAuth.loading === false"
          type="submit"
          class="btn btn-primary btn-sm btn-block"
          style="width: 100%"
        >
          LOGIN
        </button>
        <app-btn-loading v-else />
      </form>
      <div class="developer text-center mt-5">
        <small>Nurul Jadid &copy; 2023</small>
      </div>
      <div class="developerName text-center text-muted mt-3">
        <small>developed by:</small>
        <br />
        <small>@mutawakkilalallah @farhandardiri</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useThemeStore } from "../store/auth/theme";

const myTheme = useThemeStore();
const storeAuth = useAuthStore();
const myForm = ref(null);
const valid1 = ref(false);
const valid2 = ref(false);
const rePass = ref(false);
const form = ref({
  username: "",
  password: "",
});

onMounted(() => {
  myTheme;
});

function prosesLogin() {
  validInput1;
  validInput2;
  storeAuth.login(form.value);
  // console.log("my form", myForm);
  // return "ok";
}

function readPassword() {
  rePass.value = !rePass.value;
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

<style lang="scss" scoped>
.loginPage {
  height: 100vh;
  padding-bottom: 8%;
}

.boxForm {
  width: 350px;
}
.dark-mode {
  background-color: #212529;
  color: white;
}
input {
  border: 0;
  border-bottom: 1px solid #cacaca;
  border-radius: 0;
}
.input-group-text {
  border: 0;
  border-radius: 0;
  background-color: white;
}

input:focus {
  outline: none;
  box-shadow: none;
}
</style>
