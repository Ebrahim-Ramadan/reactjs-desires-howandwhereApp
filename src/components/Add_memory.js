import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Addmemory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisVertical  } from '@fortawesome/free-solid-svg-icons';
import TextField from "@mui/material/TextField";
import { alpha, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DatePickerfunc } from './Date-picker';
import Button from 'react-bootstrap/Button';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const toastify = (ImageSrc) => {
  toast.success(`${ImageSrc}`, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 800,
    theme: 'dark'
  });
};


//dropmenu
function DropdownItem(props){
  return(
    <li className='dropdownItem memory'
    onClick={props.func}>
      <a href={props.any}> {props.text} </a>
    </li>
  );
}
const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});
const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} style={{width:'800px'}} />
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

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  height: 200,
    width: 'fit-content',
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};



//slider-mui
const slide_labels = [
  {
    value: 0,
    label: 'terrible',
  },
  {
    value: 50,
    label: 'tarnished',
  },
  {
    value: 100,
    label: 'incredible',
  },
];


export const Addmemory = (props) => {
  const [schedule, setschedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [whathappened, setwhathappened] = useState('');

  const handlewhathappened = (e) => {
    setwhathappened(e.target.value)
    console.log((whathappened));
    localStorage.setItem('whathappened', e.target.value);
}
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };
  const Desire_schedulecheckbox = (e) => {
    setschedule(e.target.checked)
    console.log(!schedule);
  }
    const [hoveredIndex, setHoveredIndex] = useState(null); 
      const handleMouseEnter = (index) => {
        setHoveredIndex(index);
      };
    
      const handleMouseLeave = () => {
        setHoveredIndex(null);
      };

      const memoryslider=(value)=> {
        console.log(value);
        localStorage.setItem('memoryslider', value);
  }
  
    const navigate = useNavigate();
  
  const backtohome = () => {
    toastify('cached')
    navigate('/')
}
    const [initialFiles, setInitialFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [memoryelps, setmemoryelps] = useState(false);
  
  const toggle_memoryelps = () => {
    if (!memoryelps) {
      setmemoryelps(true)
    }
    else {
      setmemoryelps(false)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
        'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
      );
      setInitialFiles(newFiles);
        setFiles(newFiles);
        const newFilenames = newFiles.map((file) => file.name);
      setFilenames(newFilenames);
      localStorage.setItem('files', JSON.stringify(newFiles));

      },
      

  });

  const resetSorting = () => {
    if (files.length > 0) {
      setFiles([...initialFiles]);
      toastify('reset');
    } else {
      toast.error('No images to reset', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 800,
        theme: 'dark'
      });
    }
  };
  
// console.log(filenames[0]);
    
//   console.log(files)
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setFiles(items);
    localStorage.setItem('files', JSON.stringify(items));
  };

  const removeFile = (index) => {
    const deletedFile = files[index];
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, deletedFile]);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };
  const thumbs = files.map((file, index) => (
    <Draggable key={file.name} draggableId={file.name} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={thumb}
        >
          <div style={thumbInner}
onMouseEnter={() => handleMouseEnter(index)} // Update the hoveredIndex on mouse enter
onMouseLeave={handleMouseLeave} 
          >
            {hoveredIndex === index && ( // Show alt text only for the hovered image
              <p id='alt'>
                alt: {file.name.split('.')[0]}
                <button
                  type='button'
                  class='btn btn-dark btn-sm'
                  style={{ fontSize: '10px', padding: '3px 7px', margin: '5px' }}
                  onClick={() => removeFile(index)}
                >
                  X
                </button>
              </p>
            )}
                      
            <img
              
              alt='uploads'
              src={file.preview}
              onLoad={() => URL.revokeObjectURL(file.preview)}
                      />
          </div>
        </div>
      )}
    </Draggable>
  ));


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setmemoryelps(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
  files.forEach((file) => URL.revokeObjectURL(file.preview));
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const memory_dubmit = () => {
    navigate('/memory88')
  }
  return (
    <ThemeProvider theme={theme}>

    <DragDropContext onDragEnd={handleDragEnd}>
      <section className='container'>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} multiple={true} />
          <p id='drag-p'>Drag & drop some memory pictures here, or click to select files
          </p>
        </div>
        <div className='drag-instructions'>
            <span
            onClick={backtohome}>
          <FontAwesomeIcon icon={faArrowLeft} size="xl" style={{color: "#ffffff",}} />
        </span>
          <span>
            <a href='Memories-images-help'>
            (the pictures names will be recognized and shared as images' alt)
            </a>
            <br/>

        </span>
          <span
              onClick={toggle_memoryelps}
              >
            <FontAwesomeIcon size="xl" icon={faEllipsisVertical} style={{ color: "#ffffff", }}              
            />
            
        </span>
      </div>
              <Droppable droppableId="files" >
          {(provided) => (
            <aside
              style={thumbsContainer}
              {...provided.droppableProps}
                          ref={provided.innerRef}
                        //   draggable
                      >
                          
                          {thumbs}
              {provided.placeholder}
            </aside>
          )}
              </Droppable>
              
      </section>

      {memoryelps && (
              <div className='elips-dropmenu-memory'>

          <DropdownItem
              text='Reset'
              func={resetSorting}
                  />
              <DropdownItem
                // func
                    text='Restore Deletes'
                  />
      </div>
)}
      </DragDropContext>
      <div className='popup-container'>
      <form className='form-group'>
<RedditTextField
                label="what happened at that moment? feel free to awesomely storytell"
                id="reddit-input"
            variant="filled"
            multiline
                value={whathappened}
                onChange={handlewhathappened}
                // onKeyPress={handleKeyPress}
            />  
          
          <div className='popupbtns'>
          <Box sx={{ width: 500 }} >
      <Slider
        aria-label="Custom marks"
        defaultValue={30}
        getAriaValueText={memoryslider}
        step={2}
        valueLabelDisplay="auto"
        marks={slide_labels}
      />
    </Box>
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
            <Button size='lg' type="submit" variant="contained" onClick={memory_dubmit}  disabled={whathappened.trim() === ''}>Memorize</Button>
            </div>
        </form>
</div>
      </ThemeProvider>
  );
};
