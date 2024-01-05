import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { useStyles } from './App.styles';
import helicopter from './helicopter.svg';
const ButtonEnter = ({ handleClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes['buttonEnterPage']}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <img src={helicopter} alt='helicopter' style={{ marginBottom: '30px' }} />
        <Stack direction='row' spacing={2}>
          <Button variant='contained' endIcon={<SendIcon />} onClick={handleClick}>
            Войти в систему
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

export default ButtonEnter;
