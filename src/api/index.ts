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
  DeleteMessagesProps,
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
const apiAddUser = async (data: CreateUserProps) => {
  try {
    const response = await axios.post("/user/create", data);
    return response.data.code;
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

const apiGetMessages = async (id: string): Promise<ApiResponse> => {
  try {
    const result = await axios.get(`user/${id}/messages`);

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

const apiGetMessage = async (id: string): Promise<ApiResponse> => {
  try {
    const result = await axios.get(`user/${id}/messages`);

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

const apiAddMessage = async (message: AddMessageProps) => {
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

const apiUpdateMessage = async (message: UpdateMessageProps) => {
  try {
    const result = await axios.put(
      `/user/${message.id}/messages/${message.userId}/update`,
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

const apisaveMessage = async (message: UpdateMessageProps) => {
  try {
    const result = await axios.put(
      `/user/${message.id}/messages/${message.userId}/save`,
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

const apiDeleteMessage = async (
  delet: DeleteMessagesProps
): Promise<ApiResponse> => {
  try {
    const result = await axios.delete(
      `user/${delet.id}/messages/${delet.userId}/delete`
    );

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

export {
  apiLoginApp,
  apiAddUser,
  apiupdateUser,
  apiLogoffApp,
  apiDeleteUser,
  apiGetMessages,
  apiAddMessages,
  apiGetMessage,
  apiAddMessage,
  apiDeleteMessage,
  apiUpdateMessage,
  apisaveMessage,
};
