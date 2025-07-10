import Swal from "sweetalert2";

export class Alert {
  static Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  static success(message) {
    Alert.Toast.fire({
      icon: "success",
      title: `${message}`,
    });
  }

  static error(message) {
    Alert.Toast.fire({
      icon: "error",
      title: `${message}`,
    });
  }

  static warning(message) {
    Alert.Toast.fire({
      icon: "warning",
      title: `${message}`,
    });
  }

  static info(message) {
    Alert.Toast.fire({
      icon: "info",
      title: `${message}`,
    });
  }
}
