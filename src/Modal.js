import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import alertImg from './alert.svg';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ openModal, handleCloseModal }) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ zIndex: 50000 }}
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            ВНИМАНИЕ!
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Обнаружен сигнал “Стрельба из огнестрельного оружия”
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
