import Swal from "sweetalert2";
import * as storage from "../modules/storage";
import router from "../router";

const removeToken = () => {
  storage.deleteLocalToken();
  storage.deleteHeaderToken();
  storage.deleteUser();
  router.replace("/login");
};

const swalError = (err, status) => {
  if (status === 401) {
    return removeToken();
  } else {
    Swal.fire({
      icon: "error",
      title: err.message,
      text: err.error.charAt(0).toUpperCase() + err.error.slice(1),
      showConfirmButton: true,
    });
  }
};

const swalSuccess = (msg) => {
  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: msg,
    showConfirmButton: false,
    timer: 1500,
  });
};

const swalSuccessDelete = () => {
  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: "Berhasil menghapus data",
    showConfirmButton: false,
    timer: 1500,
  });
};

export { swalError, swalSuccess, swalSuccessDelete };
