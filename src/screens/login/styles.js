import { makeStyles } from "@material-ui/core/styles";
import BgLogin from "assets/images";

const useStyles = makeStyles({
  bg: {
    backgroundImage: `url(${BgLogin})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    width: "80%",
    maxWidth: "400px",
  },
  text: {
    fontFamily: "Montserrat, sans-serif",
  },
  loginButton: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "bold",
    backgroundColor: "#3f51b5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "1em",
    cursor: "pointer",
    marginTop: "20px",
  },
});

export default useStyles;
