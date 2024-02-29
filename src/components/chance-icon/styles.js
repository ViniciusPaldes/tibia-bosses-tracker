import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  chanceCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    color: "white",
    background: "black",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  chanceLabel: {
    fontSize: "10px",
  },
  chanceValue: {
    fontSize: "14px",
  },
  high: {
    backgroundColor: "#13bf62",
  },
  medium: {
    backgroundColor: "#fbde5a",
    color: 'black',
  },
  low: {
    backgroundColor: "#e4a734",
  },
  no: {
    backgroundColor: "#fc3030",
  },
  wip: {
    backgroundColor: "#00c8c8",
  },
}));
