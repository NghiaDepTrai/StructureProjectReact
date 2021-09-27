export enum TYPE_TOAST {
  WARNING = "warning",
  ERROR = "error",
  SUCCESS = "success",
  DARK = "dark",
}
import { toast, ToastOptions } from "react-toastify";
export const showToast = (mes: string | JSX.Element, type: TYPE_TOAST, options: ToastOptions = {}) => {
  toast.configure();
  switch (type) {
    case "warning":
      toast.dismiss();
      setTimeout(() => {
        toast.dismiss();
        toast.warn(mes, options);
      }, 400);
      break;
    case "error":
      toast.error(mes, options);
      break;
    case "success":
      toast.success(mes, options);
      break;
    case "dark":
      toast.dark(mes, options);
      break;
    default:
      toast.info(mes, options);
      break;
  }
};
