import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import HandlerDrop from "../handleTableDrop/HandlerTableDrop";
import Message from "../Alert/Alert";
import "./style.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import HeaderDefalt from "../../components/header/Header";
import { deletMessage, selectMessage } from "../../store/modules/Message.Slace";

import { setAlertMessage } from "../../store/modules/AlerSlace";

const SavesMessages: React.FC = () => {
  const user = useAppSelector((state) => state.Login);
  const messagesRedux = useAppSelector(selectMessage);
  const saveMessages = messagesRedux.filter(
    (message) => message._status === true
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let noMessage = "";

  if (saveMessages.length === 0) {
    noMessage = "Não tem mensagens salvas.";
  }

  const handleDeleteMessage = useCallback(
    (_id: string) => {
      const idmessage = { id: _id, userId: user.id };
      dispatch(deletMessage(idmessage));
      dispatch(
        setAlertMessage({
          msg: "Mensagem deletada com sucesso.",
          type: "success",
        })
      );
    },
    [dispatch, user.id]
  );

  const goMessages = () => {
    navigate("/messages");
  };
  const goSaves = () => {
    navigate("/saves");
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        margin: "5px",
        maxWidth: "lg",
        minHeight: "500px",
        backgroundColor: " rgb(234, 234, 236)",
      }}
    >
      <Grid item xs={12}>
        <HeaderDefalt
          title={"Mensagem salvas"}
          subTitle={""}
          goMessages={goMessages}
          goSaves={goSaves}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4">{noMessage}</Typography>
        </Grid>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {saveMessages.map((item) => {
            return (
              <HandlerDrop
                show={"drop"}
                hide={"larg"}
                key={item._id}
                messages={item}
                actionDelete={() => handleDeleteMessage(item._id)}
              />
            );
          })}
        </Paper>
      </Grid>
      <Message />
    </Grid>
  );
};

export default SavesMessages;
