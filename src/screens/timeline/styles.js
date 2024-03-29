import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    padding: '16px',
    width: '300px',
  },
  title: { 
    color: "white",
    textAlign:'center',
  },
  emptyStateLabel: {
    color: 'white',
  },
}));
  