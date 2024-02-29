import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  chanceInfo: {
    display: "flex",
    alignItems: "center",
    color: "#888",
    fontSize: "14px",
    marginLeft: "10px",
    "& span": {
      fontWeight: "bold",
      marginLeft: "5px",
    },
    "& .alta": {
      color: "#58bc6c",
    },
    "& .media": {
      color: "#f1d756",
    },
    "& .baixa": {
      color: "#E4A734",
    },
    "& .semChance": {
      color: "#e8463c",
    },
  },
}));
