import StarSelected from "@material-ui/icons/Star";
import StarUnselected from "@material-ui/icons/StarBorder";
import React from "react";

import { useStyles } from "./styles";

const Favorite = ({ isFavorite, onClick }) => {
const classes = useStyles();

  return (
    <div onClick={onClick}>
      {isFavorite ? (
        <StarSelected fontSize="medium" className={classes.favoriteSelected}/>
      ) : (
        <StarUnselected fontSize="medium" />
      )}
    </div>
  );
};

export default Favorite;
