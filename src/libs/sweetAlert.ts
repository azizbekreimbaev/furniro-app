import axios from "axios";
import Swal from "sweetalert2";


/* =====================================================
   GET ERROR MESSAGE
===================================================== */

const getErrorMessage = (
  err: unknown,
): string => {

  /* ==============================
     AXIOS ERROR
  ============================== */

  if (
    axios.isAxiosError(err)
  ) {

    const data =
      err.response?.data;


    console.log(
      "AXIOS ERROR DATA:",
      data,
    );


    /*
     * Backend:
     *
     * {
     *   message: "Wrong password"
     * }
     */

    if (
      typeof data?.message ===
      "string"
    ) {

      return data.message;
    }


    /*
     * NestJS kabi:
     *
     * {
     *   message: [
     *      "memberNick is required",
     *      "password is required"
     *   ]
     * }
     */

    if (
      Array.isArray(
        data?.message,
      )
    ) {

      return data.message.join(
        "\n",
      );
    }


    /*
     * Backend:
     *
     * {
     *    error: "Unauthorized"
     * }
     */

    if (
      typeof data?.error ===
      "string"
    ) {

      return data.error;
    }


    /*
     * Backend:
     *
     * {
     *    msg: "Something..."
     * }
     */

    if (
      typeof data?.msg ===
      "string"
    ) {

      return data.msg;
    }


    /*
     * Response to'g'ridan-to'g'ri
     * string bo'lishi ham mumkin.
     */

    if (
      typeof data ===
      "string"
    ) {

      return data;
    }


    /*
     * Network Error va boshqalar
     */

    if (
      err.message
    ) {

      return err.message;
    }
  }


  /* ==============================
     NORMAL JAVASCRIPT ERROR
  ============================== */

  if (
    err instanceof Error
  ) {

    return err.message;
  }


  /* ==============================
     STRING ERROR
  ============================== */

  if (
    typeof err ===
    "string"
  ) {

    return err;
  }


  return "Something went wrong.";
};


/* =====================================================
   ERROR ALERT
===================================================== */

export const sweetErrorHandling =
  async (
    err: unknown,
  ) => {

    const message =
      getErrorMessage(
        err,
      );


    await Swal.fire({

      icon:
        "error",

      title:
        "Error",

      text:
        message,

      confirmButtonText:
        "OK",

      confirmButtonColor:
        "#222",

    });
  };


/* =====================================================
   SUCCESS ALERT
===================================================== */

export const sweetSuccessHandling =
  async (
    message: string,
  ) => {

    await Swal.fire({

      icon:
        "success",

      title:
        "Success",

      text:
        message,

      confirmButtonText:
        "OK",

      confirmButtonColor:
        "#222",

    });
  };