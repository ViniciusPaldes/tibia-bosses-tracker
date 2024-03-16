import BgLogin from "assets/images";
import React from "react";
import { socialLogin } from "services/firebase-service";

import useStyles from "./styles";

const LoginScreen = () => {
  const onGoogleButtonPress = async () => {
    await socialLogin();
  };
  const classes = useStyles();


  return (
    <div className={classes.bg}>
      <div className={classes.content}>
        <h2 className={classes.text}>Check Boss - Tibia</h2>
        <p className={classes.text}>
          Sua fonte confiável para check de bosses, atualmente disponível para
          Venebra.
        </p>
        <button onClick={onGoogleButtonPress} className={classes.loginButton}>
          Login com o Google
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
