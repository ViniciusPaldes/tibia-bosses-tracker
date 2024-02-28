import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  filterButton: {
    margin: '4px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '& .MuiChip-label': {
      color: 'white',
      padding: '8px 16px',
    },
  },
}));
