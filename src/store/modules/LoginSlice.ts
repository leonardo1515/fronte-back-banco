import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  apiLogoffApp,
  apiLoginApp,
  apiupdateUser,
  apiDeleteUser,
} from "../../api";
import { DeletUserProps, UpdateUeserProps } from "../../api/types";
import { LoginUserProps, LogoffUserProps } from "../types/index";
import { setTestAlert } from "./StatusApiAlertSlice";

export type GetUser = {
  id: string;
  name: string;
  email: string;
  status: boolean;
  password: string;
  message?: [];
};
const initialState: GetUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  status: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (login: LoginUserProps, { dispatch }) => {
    const result = await apiLoginApp(login);

    // if (result.ok === false) {
    //   dispatch(
    //     setTestAlert({
    //       msg: result.message,
    //       type: "error",
    //       open: "close",
    //     })
    //   );
    // }

    dispatch(
      setTestAlert({
        msg: result.message,
        type: "error",
        open: "close",
      })
    );

    sessionStorage.setItem("looged", result.data.status);
    dispatch(
      setTestAlert({
        msg: result.message,
        type: "success",
        open: "close",
      })
    );
    return result;
  }
);

export const editeUser = createAsyncThunk(
  "user/editeUser",
  async (user: UpdateUeserProps, { dispatch }) => {
    try {
      const result = await apiupdateUser(user);
      let changes = {};

      if (result.ok) {
        changes = {
          name: user.name,
          password: user.password,
        };
        dispatch(
          setTestAlert({
            msg: result.message,
            type: "success",
            open: "close",
          })
        );
      }
      return {
        id: user.id,
        changes,
      };
    } catch (result: any) {
      dispatch(
        setTestAlert({
          msg: result.message,
          type: "error",
          open: "close",
        })
      );
      return result.message;
    }
  }
);

export const logoffUser = createAsyncThunk(
  "user/logoffUser",
  async (logoff: LogoffUserProps, { dispatch }) => {
    try {
      const result = await apiLogoffApp(logoff);
      if (result.ok === false) {
        dispatch(
          setTestAlert({
            msg: result.message,
            type: "error",
            open: "close",
          })
        );
      }

      dispatch(
        setTestAlert({
          msg: result.message,
          type: "success",
          open: "close",
        })
      );

      return result;
    } catch (data: any) {
      return data.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deletUser",
  async (user: DeletUserProps, { dispatch }) => {
    try {
      const result = await apiDeleteUser(user);
      if (result.ok === false) {
        dispatch(
          setTestAlert({
            msg: result.message,
            type: "error",
            open: "close",
          })
        );
      }
      dispatch(
        setTestAlert({
          msg: result.message,
          type: "success",
          open: "close",
        })
      );
      return result;
    } catch (result: any) {
      dispatch(
        setTestAlert({
          msg: result.message,
          type: "error",
          open: "close",
        })
      );
      return result.message;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    updateuser(state, action) {
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const result = action.payload;

        if (result.ok) {
          return result.data;
        }
      })
      .addCase(logoffUser.fulfilled, (state, action) => {
        state.id = "";
        state.name = "";
        state.email = "";
        state.status = false;
        state.password = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(editeUser.fulfilled, (state, action) => {});
  },
});
export const { updateuser } = loginSlice.actions;
export default loginSlice.reducer;
