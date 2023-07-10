import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { DatePickerfunc } from './Date-picker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Leafpoll } from './leafpoll';


const toastify = (ImageSrc) => {
  toast.success(`${ImageSrc}`, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 800,
    theme: 'dark'
  });
};




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});
const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} style={{width:'500px'}} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === '' ? '#161B22' : '#161B22',
    border: '1px solid',
    color:'white',
    borderColor: theme.palette.mode === '#8B8D91' ? '#8B8D91' : '#8B8D91',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '& input::placeholder': {
      color: theme.palette.mode === 'dark' ? '#8B8D91' : '#8B8D91',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiInputBase-root::placeholder': {
      color: theme.palette.mode === '#8B8D91' ? '#8B8D91' : '#8B8D91',
    },
    
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      color:'white',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const PopupInput = ({ onClose, onSubmit, }) => {

  
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [schedule, setschedule] = useState(false);
  const [poll, setpoll] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const Desire_schedulecheckbox = (e) => {
    setschedule(e.target.checked)
    console.log(!schedule);
  }
  const Poll_schedulecheckbox = (e) => {
    setpoll(e.target.checked)
    console.log(!poll);
  }
  const handlePollSelection = (item, results) => {
    setSelectedPoll(item);
    console.log('Selected poll:', item);
  };
  
  //handling the submit whether its a scheduled or immmedite
  const handleSubmit = (e) => {
    if (inputValue.trim() !== '') {
      if (schedule && selectedDate) {
        const currentTime = new Date().getTime();
        const scheduledTime = selectedDate.getTime();
        const timeLeft = scheduledTime - currentTime;
  
        // Schedule the task
        setTimeout(() => {
          onSubmit(inputValue, selectedDate);
          setInputValue(inputValue);
          console.log(inputValue);
          setInputValue('');
          setschedule(false)
          console.log('Scheduled task executed:', inputValue);
        }, timeLeft);
        toastify('post sfcheduled')
      } else {
        e.preventDefault();
        onSubmit(inputValue, selectedDate);
        setInputValue(inputValue);
        console.log(inputValue);
        setInputValue('');
        setschedule(false)

      }
    };
  }
  const handleClose = () => {
    onClose();
  };



  return (
        <ThemeProvider theme={theme}>
    <div className="popup-container">
      <form className='form-group'>
      <RedditTextField

            multiline
            label="Add A Desire"
                id="reddit-input"
                variant="filled"
            value={inputValue}
            onChange={handleInputChange} 
                // onKeyPress={handleKeyPress}
          />
          
          <div className='popupbtns'>
          <FormControlLabel
              control={
                <Checkbox {...label} onChange={Poll_schedulecheckbox}
                />
            }
            label='memory?'
            />
            {poll && (
              <span>
                <Leafpoll
                question='memory?'></Leafpoll>
              </span>
          )}
          </div>
          <div className='popupbtns'>
            <FormControlLabel
              control={
                <Checkbox {...label} onChange={Desire_schedulecheckbox}
                />
            }
            label='schedule posting?'
            />
            {schedule && (
              <span>
                <DatePickerfunc
                  
                  label='when?'
                  onDateChange={handleDateChange}
                ></DatePickerfunc>
              </span>
            )}
          </div>
          <div className='popupbtns'>
          <Button size='ls' onClick={handleSubmit} type="submit" disabled={inputValue.trim() === ''}>Submit</Button>
        <Button onClick={handleClose}>Close</Button>
        </div>
        </form>
    </div>
    </ThemeProvider>
  );
};

export default PopupInput;
