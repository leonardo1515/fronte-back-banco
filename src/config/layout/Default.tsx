import React from "react";
import { Grid } from "@mui/material";
interface DefaultLayoutProps {
  page: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ page }) => {
  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: " rgb(231, 247, 251)",
        }}
      >
        {page}
      </Grid>
    </>
  );
};

export default DefaultLayout;
