import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    margin: 32,
  },
  app: {
    display: "flex",
  },
  routes: {
    flexGrow: 1,
    padding: "16px",
    width: "100%",
  },
}));
