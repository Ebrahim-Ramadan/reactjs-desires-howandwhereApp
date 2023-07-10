import { useState } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import PopupInput from './AddItem';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEuro } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@material-ui/core/TextField';
import noexistimg from '../assets/background.png'
import { ButtonGroup } from '@mui/material';
import { faArrowLeft, faEllipsisVertical  } from '@fortawesome/free-solid-svg-icons';
import header_desires from '../assets/lana del ray.jpg'
import { db } from '../firebaseConfig'

// function DropdownItem(props){
//   return(
//     <li className = 'dropdownItem desire'>
//       <i class={props.i}></i>
//       <a href={props.href}> {props.text} </a>
//     </li>
//   );
// }

export const Content = () => {
  const storedData = localStorage.getItem('Desires');
  const parsedData = storedData ? JSON.parse(storedData) : [];
  const [items, setItems] = useState(parsedData);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [updatedItemValue, setUpdatedItemValue] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const handleClick = () => {
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const handleSubmit = (inputValue) => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: items.length + 1,
        checked: false,
        itemInfo: inputValue,
      };
      setItems([...items, newItem]);
      localStorage.setItem('Desires', JSON.stringify([...items, newItem]));


      db.collection('desires')
      .doc() // Firestore will generate a unique ID for the document
      .set({
        desire_content: inputValue,
      })
      .then(() => {
        console.log('Desire added successfully!');
      })
      .catch((error) => {
        console.error('Error adding desire: ', error);
      });
    }
  };

  const ItemClick = (itemId) => {
    const selectedItem = parsedData.find((item) => item.id === itemId);
    if (selectedItem) {
      const selectedValue = selectedItem.itemInfo;
      console.log(selectedValue);
    }
  };

  const handleCheckBoxes = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    localStorage.setItem('Desires', JSON.stringify(updatedItems));

    const checkedIds = updatedItems
    .filter((item) => item.checked)
    .map((item) => item.id);
  setSelectedIds(checkedIds);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      localStorage.setItem('Desires', JSON.stringify(updatedItems));

      const checkedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item.id);
    setSelectedIds(checkedIds);
    
    
    }
  };

  const handleEdit = (id) => {
    const selectedItem = parsedData.find((item) => item.id === id);
    if (selectedItem) {
      setEditItemId(id);
      setUpdatedItemValue(selectedItem.itemInfo);
    }
  };

  const handleUpdate = () => {
    if (updatedItemValue.trim() !== '') {
      const updatedItems = items.map((item) => {
        if (item.id === editItemId) {
          return {
            ...item,
            itemInfo: updatedItemValue,
          };
        }
        return item;
      });
      setItems(updatedItems);
      localStorage.setItem('Desires', JSON.stringify(updatedItems));
      setEditItemId(null);
      setUpdatedItemValue('');
      
      const checkedIds = updatedItems
        .filter((item) => item.checked)
        .map((item) => item.id);
      setSelectedIds(checkedIds);
    }
  };

  const handleCancel = () => {
    setEditItemId(null);
    setUpdatedItemValue('');
  };

  return (
    <div className='page-content'>
      <div className='header' style={{display: 'flex', justifyContent: 'center', margin:'55px 0px' }}>
        <img
          alt='header_lana'
          src={header_desires}
          style={{maxHeight:'332px'}}/>
      </div>
      {items.length ? (
        <>
          <div className='Itemcontainer abs-title'>
            {items.map((item, index) => (
              <div
                className='miniItem'
                onClick={() => ItemClick(item.id)}
                key={item.id+index}
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
              >
                {editItemId === item.id ? (
                  <>
                    <div >
                    <TextField
                        multiline
                        // style={{ display: 'flex', maxHeight: '100px', overflow: 'auto' }}
                        fullWidth
                      autoFocus={true}
                      // type='text'
                        value={updatedItemValue}
                      onChange={(e) => setUpdatedItemValue(e.target.value)}
                    />
</div>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant='outlined' size='sm' onClick={handleUpdate}>
                      Save
                    </Button>
                    <Button variant='outlined' size='sm'color="error" onClick={handleCancel}>
                      Cancel
                    </Button>
</ButtonGroup>
                  </>
                ) : (
                  <div
                    className='Item'
                    style={item.checked ? { color: '#548965' } : { color: '' , maxHeight: '120px', overflow: 'auto' }}
                  >
                    {item.itemInfo}
                  </div>
                )}
                <Stack color='red' direction='row' className='symbols' spacing={2} style={{color:'red'}}>
                  <Checkbox
                    
                    style={{color:'red'}}
                    onChange={() => {
                      handleCheckBoxes(item.id);
                    }}
                    checked={item.checked}
                    inputProps={{ 'aria-label': 'Checkbox demo' }}
                  />
                  {editItemId !== item.id && (
                    <Button
                      icon={EditIcon}
                    variant="contained"
                      size='sm'
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      // startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  )}
                  
                  <Button
                    variant='outlined'
                    size='sm'
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                  
                </Stack>
              </div>
            ))}
          </div>
        </>
      ) : (
        
          <div className='noitemsfound' style={{display: 'flex', justifyContent: 'center' }}>
              <div>
              <img src={noexistimg} alt='no desires' style={{ maxHeight: '280px', textAlign: 'center' }} />
              <p style={{paddingTop:'30px'}}>
                You have not desired any relatables yet,<br/> let your buds know what is it
              </p>
</div>

            </div>

        
      )}
        <div className='center'>
        <FontAwesomeIcon
          icon={faPlus}
          onClick={handleClick}
          style={{ transition: 'transform 0.2s', cursor: 'pointer', minHeight: '30px' }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.45)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
          className='AddItem'
          size='sm'
          color='#2C73D2'
        />
        {isPopupOpen && <PopupInput onClose={handleClose} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};
