import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SaveAlt } from "@mui/icons-material";
import React, { useCallback, useState } from "react";
import "./style.css";
import Message from "../Alert/Alert";
import DropBUtton from "../drop/Drop";
import { MessagesTableProps } from "../TypesComponents";
import ModalDelete from "../ModalDelete/ModalDelete";
import ModalTransaction from "../ModalTransaction/ModalTransaction";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import {
//   selectById,
//   saveMessage,
//   updateOne,
// } from "../../store/modules/MessagsSlace";
import {
  selectById,
  saveMessage,
  updateOne,
} from "../../store/modules/Message.Slace";
import { setAlertMessage } from "../../store/modules/AlerSlace";

const HandlerDrop: React.FC<MessagesTableProps> = ({
  messages,
  actionDelete,
  show,
  hide,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"message" | "user">("message");
  const user = useAppSelector((state) => state.Login);
  const messageCurretRedux = useAppSelector((state) =>
    selectById(state, messages._id ?? "")
  );
  const closeDeleteModal = () => setOpenDelete(false);
  const openDeleteModal = () => {
    setActionType("message");
    setOpenDelete(true);
  };
  const closeModal = () => setOpen(false);
  const openModal = () => {
    setOpen(true);
  };
  const dispatch = useAppDispatch();

  const saveMessag = useCallback(() => {
    dispatch(
      saveMessage({
        userId: user.id,
        id: messages._id,
        message: messageCurretRedux?._message,
        descript: messageCurretRedux?._descript,
        status: !messageCurretRedux?._status,
      })
    );

    dispatch(
      updateOne({
        id: messages._id,
        changes: {
          _message: messageCurretRedux?._message,
          _descript: messageCurretRedux?._descript,
          _status: !messageCurretRedux?._status,
        },
      })
    );
    dispatch(
      setAlertMessage({
        msg: "Mensagem salva com sucesso.",
        type: "success",
      })
    );
  }, [
    dispatch,
    messageCurretRedux?._descript,
    messageCurretRedux?._message,
    messageCurretRedux?._status,
    messages._id,
    user.id,
  ]);

  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <Box className={hide}>
              <IconButton
                onClick={() => saveMessag()}
                edge="end"
                aria-label="edit"
                sx={{ marginRight: "20px" }}
              >
                <SaveAlt />
              </IconButton>
              <IconButton
                onClick={() => openModal()}
                edge="end"
                aria-label="edit"
                sx={{ marginRight: "20px" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => openDeleteModal()}
                edge="end"
                aria-label="delete"
                sx={{ marginRight: "20px" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box className={show}>
              <DropBUtton
                message={messages}
                actionDelete={() => openDeleteModal()}
                saveMessag={() => saveMessag()}
                openModal={() => openModal()}
              />
            </Box>
          </>
        }
      >
        <ListItemText
          primary={messages._message}
          secondary={messages._descript}
        />
      </ListItem>
      <Divider variant="inset" />
      <ModalTransaction
        actionCancel={closeModal}
        open={open}
        idMessage={messages._id}
      />
      <ModalDelete
        open={openDelete}
        actionType={actionType}
        actionCancel={closeDeleteModal}
        actionDelete={() => actionDelete(messages._id)}
      />
      <Message />
    </>
  );
};

export default HandlerDrop;
