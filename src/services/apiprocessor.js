import axios from "axios";
import { toast } from "react-toastify";

const apiprocessor = async ({ url, method, payload, showToast }) => {
  try {
    const reponsepending = axios({
      url,
      method,
      data: payload,
    });
    if (showToast) {
      toast.promise(reponsepending, { pending: "please wait..." });
    }
    const { data } = await reponsepending;
    showToast && toast[data.staus](data.message);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message;
    showToast && toast.error(msg);
  }
};
