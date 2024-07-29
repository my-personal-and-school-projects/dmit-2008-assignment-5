import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(props) {
  return (
    <Box display="flex" justifyContent="center">
      <Box alignItems="center" justifyContent="center">
        <Typography m="auto" gutterBottom>
          {props.text}
        </Typography>
        <CircularProgress />
      </Box>
    </Box>
  );
}
