import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  AddMessageProps,
  DeletePopsMessage,
  GetMessageProps,
  SaveMessageProps,
} from "../types/index";
import {
  apiAddMessage,
  apiGetMessage,
  apisaveMessage,
  apiUpdateMessage,
  apiDeleteMessage,
} from "../../api";

const adapter = createEntityAdapter<GetMessageProps>({
  selectId: (item) => item._id,
});

export const { selectAll: selectMessage, selectById } = adapter.getSelectors(
  (state: RootState) => state.Message
);

export const getMessages = createAsyncThunk(
  "user/getAllmessages",
  async (id: string) => {
    const result = await apiGetMessage(id);
    if (result.ok) {
      return result.data;
    }

    return [];
  }
);

export const addMesage = createAsyncThunk(
  "user/addMessage",
  async (message: AddMessageProps) => {
    const result = await apiAddMessage({ ...message });
    if (result.ok) {
      return {
        ok: true,
        data: result,
      };
    }

    return {
      ok: false,
    };
  }
);

export const updateMessage = createAsyncThunk(
  "user/editeMessage",
  async (message: any) => {
    const { result } = await apiUpdateMessage(message);
    let changes = {};

    if (result.ok) {
      changes = {
        message: message.message,
        descript: message.descript,
        save: message.save,
      };
    }
    return {
      id: message.idCurrentMessage,
      changes,
    };
  }
);

export const saveMessage = createAsyncThunk(
  "user/saveMessage",
  async (message: SaveMessageProps) => {
    const result = await apisaveMessage(message);

    let changes = {};

    if (result.ok) {
      changes = {
        message: message.message,
        descript: message.descript,
        save: message.status,
      };
    }
    return {
      id: message.id,
      changes,
    };
  }
);

export const deletMessage = createAsyncThunk(
  "user/deletMessage",
  async (messages: DeletePopsMessage) => {
    const result = await apiDeleteMessage(messages);

    if (result.ok) {
      return {
        ok: true,
        data: messages.id,
      };
    }

    return {
      ok: false,
    };
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    remove: adapter.removeOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getMessages.fulfilled,
        (state, action: PayloadAction<GetMessageProps[]>) => {
          adapter.setAll(state, action.payload);
        }
      )
      .addCase(addMesage.fulfilled, (state, action) => {
        const result = action.payload.data.data;
        adapter.addOne(state, result);
      })
      .addCase(deletMessage.fulfilled, (state, action) => {
        if (action.payload.ok === true) {
          const result = action.payload.data;
          adapter.removeOne(state, result!);
        }
      })
      .addCase(updateMessage.fulfilled, (state, action) => {});
  },
});

export const { addOne, addMany, updateOne } = messageSlice.actions;
export default messageSlice.reducer;
