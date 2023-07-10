import { NavLink } from 'react-router-dom';
import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index';
import { FaBeer } from "react-icons/fa";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import TextField from "@mui/material/TextField";
import { alpha, styled } from '@mui/material/styles';
// import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Profile.css'
import Notifications from "react-notifications-menu";

const DEFAULT_NOTIFICATION = {
  image:
    "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
  message: "Notification one.",
  detailPage: "/events",
  receivedTime: "12h ago"
};

const username = 'sharmojj'
function DropdownItem(props){
  return(
    <li className = 'dropdownItem profile'>
      <i class={props.i}></i>
      <a href={props.href}> {props.text} </a>
    </li>
  );
}
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


const PeopleFoldSvg = React.forwardRef((props, ref) => (
  <svg {...props} width="1.5em" height="2em" viewBox="0 7 40 40" ref={ref}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#34C3FF"
        d="M10 36H4a4 4 0 01-4-4V6a4 4 0 014-4h11.394a3 3 0 012.497 1.336L21 9h14a4 4 0 014 4v23H10z"
        opacity={0.2}
      />
      <circle cx={27} cy={23} r={3} fill="#34C3FF" stroke="#34C3FF" strokeWidth={2} />
      <path
        fill="#80DDFF"
        d="M15 38a1 1 0 01-1-1v-3.5c0-1.607 1.02-3.214 2.696-4.001a3.5 3.5 0 113.608.001c1.676.786 2.696 2.393 2.696 4V37a1 1 0 01-1 1zm17 0a1 1 0 01-1-1v-3.5c0-1.607 1.02-3.214 2.696-4.001a3.5 3.5 0 113.608.001c1.676.786 2.696 2.393 2.696 4V37a1 1 0 01-1 1z"
      />
      <path
        fill="#34C3FF"
        stroke="#34C3FF"
        strokeWidth={2}
        d="M27 27l.257.007c1.279.064 2.43.61 3.279 1.457A4.984 4.984 0 0132 32h0v6H22v-6c0-1.38.56-2.63 1.464-3.536A4.984 4.984 0 0127 27h0z"
      />
    </g>
  </svg>
));





export const Navbar = () => {
  const [profileicon, setprofileicon] = useState(false);
  const [searchInput, setsearchInput] = useState(false);
  const [searchTerm, setsearchTerm] = useState('');
  // const [notificationshow, setnotificationshow] = useState('');

  // const toggleNotification = () => { 
  //   if (!notificationshow) { 
  //     setnotificationshow(true)
  //     } else {
  //       setnotificationshow(false)
        
  //     }
  // }
  
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");

  const onClick = () => {
    if (message.length > 0) {
      setData([
        ...data,
        {
          ...DEFAULT_NOTIFICATION,
          message
        }
      ]);
      setMessage("");
      alert("notification added");
    }
  };
  
  const searchShow = () => {
    if (!searchInput) { 
    setsearchInput(true)
    } else {
    setsearchInput(false)
      
    }
  }

  const handleInput = (event) => {
    setsearchTerm(event.target.value)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (searchTerm !== '') {
        console.log('Search:', searchTerm);
        // perform more search logic here

      }
    }
  };

  const toggle_profileicondunc = () => {
    if (!profileicon) {
      setprofileicon(true)
    }
    else {
      setprofileicon(false)
    }
  }
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setprofileicon(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
        <div className="app-container">


        <nav className='navbar'>
          <div>
          <a href='/Products'>
            <svg className='svglogo' width="100" height="30"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-100 0 450 150"
                    stroke="white"
                    stroke-width="11"
                    strokeLinecap="round"
                    fill="none"
                    strokeLinejoin="round"
                    >
                    <path class="A1" d="M132 146 L40 10 L113 10 L183 105 L280 10" />
                    <path class="A2" d="M75 10 L155 125" />
                    <path class="B2" d="M168 82 L242 10" />
                    <path class="B3" d="M150 61 L202 10" />
                    </svg>
                </a>
          </div>

          {searchInput && (
            <div className='searchbar' style={{padding:'0'}}>
            <RedditTextField
                label="Search"
                id="reddit-input"
                variant="filled"
                value={searchTerm}
                onChange={handleInput}
                onKeyPress={handleKeyPress}
            />
              
        </div>
          )}
          <div style={{display:'flex'}}>
            <NavLink onClick={searchShow}>
              <MDBIcon icon="search" color="white" />
            </NavLink>
            <NavLink>
            {/* <span id="boot-icon" class="bi bi-bell" style={{fontSize: '1.4rem', color: 'rgb(84, 84, 84)'}}></span> */}
              <Notifications
                style={{width:'30px', height:'0px', color:'white'}}
              data='gifdssk5trre gu5tg besjhfgedsfb'
              header={{
                title: "Notifications",
                option: { text: "View All", onClick: () => console.log("Clicked") }
              }}
              markAsRead={(data) => {
                console.log('data');
              }}
            />
</NavLink>
            
            <NavLink to='/Messages'><i class="bi bi-chat-right-heart-fill" /></NavLink>
            
            <NavLink to='/Communities'><PeopleFoldSvg/>
            </NavLink>
            <NavLink to='/Profile' className='profileicon'>
            <i class="bi bi-person-square" />

            </NavLink>
            <NavLink >
              <KeyboardArrowDownIcon style={{ transform: profileicon ?  'rotate(0)' : 'rotate(180deg)' , transition: '0.5s', marginLeft:'-10px'}} onClick={toggle_profileicondunc} />
            </NavLink>
            

          </div>

        </nav>
      </div>
        {profileicon && (
          <div className='dropmenu-profile'>
            
            <div className='currently_IN'>
              <p>
              currently in
            </p>
            <DropdownItem
              i= "bi bi-person-square"
              href='/Profile'
              text={username}
            />
            </div>
            

            <div className='Your-Account'>
              <p>
              Your Account
            </p>
            <DropdownItem
              i= 'bi bi-badge-ad'
              href='/Ads'
              text='Ads Account'
              />
              <DropdownItem
              i= "bi bi-record"
              href='/Ads'
              text='Storytelling'
              />
                          <DropdownItem
              i= "bi bi-activity"
              href='/Ads'
              text='Analytics'
            />
            <DropdownItem
              i= "bi bi-gear-wide"
              href='/Ads'
              text='settings'
            />
            </div>
            
            <div className='Help'>
              <p>
              Help
            </p>
            <DropdownItem
              i= "bi bi-shield"
              href='/Ads'
              text='Privacy Policy'
            />
            <DropdownItem
              i= "bi bi-safe"
              href='/Ads'
              text='Request A New Feature'
            />
            <DropdownItem
              i= "bi bi-info-circle"
              href='/Ads'
              text='Get help'
            />
            </div>
          
          </div>
              )}
            
      </ThemeProvider>
    )
};
