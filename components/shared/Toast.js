import { toast } from "react-toastify";
const Toast = (type, message) => {
  if (type === "error") {
    return toast.error(message, {
      // position: "top-right",
      autoClose: 5000,
      // toastId: id,
      // theme: "dark",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    return toast.success(message, {
      // position: "top-right",
      autoClose: 5000,
      // toastId: id,
      // theme: "dark",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export { Toast };
