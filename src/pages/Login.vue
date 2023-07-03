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
      <input
        v-model="username"
        type="text"
        class="form-control mb-2"
        placeholder="Username"
      />
      <input
        v-model="password"
        type="password"
        class="form-control mb-3"
        placeholder="Password"
      />
      <div v-if="errorLogin" class="error-login text-center text-danger mb-3">
        <small>Invalid login</small>
      </div>
      <button
        type="button"
        class="btn btn-primary btn-block"
        style="width: 100%"
        @click="prosesLogin"
      >
        LOGIN
      </button>
      <div class="developer text-center mt-5">
        <small>Nurul Jadid &copy; 2023</small>
      </div>
      <div class="developer text-center mt-3">
        <i>developed by:</i>
        <br />
        <i>@mutawakkilalallah</i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      // status komponen
      errorLogin: false,
      // data login
      username: "",
      password: "",
    };
  },
  methods: {
    async prosesLogin() {
      if (this.username === "" && this.password === "") {
        Swal.fire(
          "Ops !",
          "harap isi username & password telebih dahulu",
          "error"
        );
      } else {
        const dataLogin = {
          username: this.username,
          password: this.password,
        };

        try {
          const result = await axios.post(
            "https://puber-api.kildev.my.id/login",
            dataLogin
          );

          localStorage.setItem("token", result.data.token);
          localStorage.setItem("nama", result.data.data.nama);
          localStorage.setItem("role", result.data.data.role);
          this.$router.replace("/");
        } catch (err) {
          this.errorLogin = true;
        }
      }
    },
  },
};
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
