import axios, { AxiosResponse } from "axios";
import { AddMessageProps } from "../store/types";
import {
  CreateUserProps,
  LoginProps,
  ApiResponse,
  DeletUserProps,
  UpdateMessageProps,
  UpdateUeserProps,
  LogoffProps,
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiAddUser = async (data: CreateUserProps) => {
  try {
    const response: AxiosResponse = await axios.post("/user/create", data);
    return response;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiLoginApp = async (login: LoginProps): Promise<ApiResponse> => {
  try {
    const result = await axios.post("/user/login", login);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiLogoffApp = async (logoff: LogoffProps) => {
  try {
    const result = await axios.put(`user/${logoff.id}/logoff`, logoff);
    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiupdateUser = async (
  userUpdate: UpdateUeserProps
): Promise<ApiResponse> => {
  try {
    const result = await axios.put(`/user/${userUpdate.id}/update`, userUpdate);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiDeleteUser = async (
  deletUser: DeletUserProps
): Promise<ApiResponse> => {
  try {
    const result = await axios.delete(`/user/${deletUser.id}/delete`);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

// const apiGetAllMessages = async (messages: string): Promise<ApiResponse> => {
//   try {
//     const result = await axios.get(`user/${messages}/messages`);

//     return result.data;
//   } catch (error: any) {
//     console.log(error);
//     if (error.request?.response) {
//       return JSON.parse(error.request?.response);
//     }

//     return {
//       ok: false,
//       message: error.toString(),
//     };
//   }
// };

const apiAddMessages = async (message: AddMessageProps) => {
  try {
    const result = await axios.post(
      `user/${message.userId}/message/create`,
      message
    );

    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiUpdateMessages = async (message: UpdateMessageProps) => {
  try {
    const result = await axios.put(
      `/user/${message.id}/messages/update`,
      message
    );
    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apiDeleteMessages = async (id: string): Promise<ApiResponse> => {
  try {
    const result = await axios.delete(`user/${id}/messages/delete`);

    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

const apisaveMessages = async (message: UpdateMessageProps) => {
  try {
    const result = await axios.put(
      `/user/${message.id}/messages/save`,
      message
    );
    return result.data;
  } catch (error: any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export {
  apiAddUser,
  apiLoginApp,
  apiLogoffApp,
  apiupdateUser,
  apiDeleteUser,
  apiAddMessages,
  // apiGetAllMessages,
  apiDeleteMessages,
  apiUpdateMessages,
  apisaveMessages,
};
