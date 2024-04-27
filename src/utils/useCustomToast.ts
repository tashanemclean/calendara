import { useRef } from 'react';
import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

const useCustomToast = () => {
  const toastId = useRef<null | string | number>(null);
  const toastConfig: Partial<ToastOptions> = {
    position: 'bottom-center',
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    delay: 1,
  };

  const successToast = (message: string) => {
    // clear any existing toast
    toast.dismiss();
    toastId.current = toast.success(message, toastConfig);
  };

  const errorToast = (message: string) => {
    // clear any existing toast
    toast.dismiss();
    toastId.current = toast.error(message, toastConfig);
  };

  return {
    errorToast,
    successToast,
  };
};

export default useCustomToast;
