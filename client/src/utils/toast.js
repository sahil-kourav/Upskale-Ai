import { toast } from "react-toastify";

export const notify = {
  loading: (msg = "Loading...") =>
    toast.loading(msg),

  success: (
    id,
    msg = "Success"
  ) =>
    toast.update(id, {
      render: msg,
      type: "success",
      isLoading: false,
      autoClose: 2000,
    }),

  error: (
    id,
    msg = "Something went wrong"
  ) =>
    toast.update(id, {
      render: msg,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    }),
};