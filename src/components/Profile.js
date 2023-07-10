import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Profile.css';
import pfp from '../assets/human_head.jpeg';
import header from '../assets//New-header.jpg';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTimes  } from '@fortawesome/free-solid-svg-icons';
import { ImageUploadcrop } from './imageUpload-crop';
import { HeaderUploadcrop } from './HeaderUpload_crop';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DropdownItem(props) {
  return (
    <li className="dropdownItem follower-following">
      <div>
        <i className={props.i}></i>
        <a href={props.href}>{props.text}</a>
      </div>
      <span className="follower-count">165 followers</span>
    </li>
  );
}
const toastify = (ImageSrc) => {
  toast.success(`${ImageSrc} updated`, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1500,
    theme: 'dark'
  });
};


const male = 'he/him';
const female = 'she/her';
const sharmo_jj = 'sharmo_jj';
const bio = 'https://www.instagram.com/iilujj/';

export const Profile = () => {
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgviewercaption, setImgViewerCaption] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const openLightbox = useCallback((imgsource, caption) => {
    setImgViewerCaption(caption);
    setSelectedImage(imgsource);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setImgViewerCaption(null);
    setSelectedImage(null);
    setViewerIsOpen(false);
  };

  // Editing pfp
  const [src, stsrc] = useState(null);
  const [src_header, stsrc_header] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };


  // Show the pfp edit btn
const [editpfp_imgcrop, seteditpfp_imgcrop] = useState(false)
  const editpfp_imgcrop_func = () => {
    seteditpfp_imgcrop(true)
  }
  
const [editheader_imgcrop, seteditheader_imgcrop] = useState(false)
  const editheader_imgcrop_func = () => {
    seteditheader_imgcrop(true)
  }
  

  // Show the edit btn


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        seteditheader_imgcrop(false);
        seteditpfp_imgcrop(false)
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const triggerFollowersMenu = () => {
    setShowDropdown(true);
    // dropdownRef.current.style.display = 'flex';
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    // dropdownRef.current.style.display = 'none';
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleSave = (croppedImageURL) => {
    stsrc(croppedImageURL);
    seteditpfp_imgcrop(false);
    toastify('pfp')

  };
  const handleSave_header = (croppedImageURL) => {
    stsrc_header(croppedImageURL);
    seteditheader_imgcrop(false);
    toastify('header')

  };
  return (
    <div className="page-content">
      <div className="upperPart">
        <div className="headerpluspfp">
          <div className="cover-img">
            <img
              alt="cover"
              src={src_header || header}
              style={{ width: '100%', height: '100%' }}
              onClick={() => openLightbox(src_header, 'header')}

            />
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{
                transform: 'translate(9px, -32px)',
                fontSize: '20px',
                cursor: 'pointer',
                opacity: '0.9',
              }}
              onClick={editheader_imgcrop_func}
            />
            {editheader_imgcrop && (
              <HeaderUploadcrop setCroppedImage={handleSave_header} />
            )}
                  {editpfp_imgcrop && (
                            <ImageUploadcrop setCroppedImage={handleSave} />
      )}
          </div>

          <div className="pfp-img">
            <img
              alt="PFP"
              src={src||pfp}
              style={{ height: '180px' }}
              onClick={() => openLightbox(src, 'pfp<3')}
            />

            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{
                position: 'absolute',
                fontSize: '20px',
                cursor: 'pointer',
                bottom: '135px',
                right: '610px',
                opacity: '0.9',
              }}
              onClick={editpfp_imgcrop_func}
            />
          </div>
          <div className="username-main">
            <h3>Mourii</h3>
            <h6>
              <p style={{ color: 'gray' }}>
                @<span>{sharmo_jj}</span>
                <span style={{ padding: '0px 4px' }}>·</span>
                <span>{male}</span>
              </p>
            </h6>
            <h6>
              <a href={bio} target="_blank ">
                {bio}
              </a>
            </h6>
            <h6>
              <span className="followers" onClick={triggerFollowersMenu}>
                2 followers
              </span>
              <span style={{ padding: '0px 2px' }} />.
              <span style={{ padding: '0px 2px' }} />
              <span className="following">28 following</span>
            </h6>
          </div>
        </div>
      </div>

      {showDropdown && (
        <div className="dropmenu-followers" ref={dropdownRef}>
          <div>
            <div>
              <h4>Followers</h4>
              <DropdownItem i="bi bi-person-square" href="/person01" text="person01" />
              <DropdownItem i="bi bi-person-square" href="/person02" text="person02" />
              <DropdownItem i="bi bi-person-square" href="/person05" text="person05" />
              <DropdownItem i="bi bi-person-square" href="/person03" text="person03" />
              <DropdownItem i="bi bi-person-square" href="/person04" text="person04" />
            </div>
            <FontAwesomeIcon
              icon={faTimes}
              className='close-icon'
              onClick={closeDropdown}
              style={{ cursor: 'pointer',fontSize:'20px', translate:'40px 0px'}}
            />
          </div>
        </div>
      )}

      <div className="classifyList">
        <NavLink className="classifyList-ul" to="/Desires" activeClassName="active">
          YourDesires
        </NavLink>
        <NavLink className="classifyList-ul" to="/Profile/YourFeed" activeClassName="active">
          YourFeed
        </NavLink>
        <NavLink
          className="classifyList-ul"
          to="/Profile/Recommendations"
          activeClassName="active"
        >
          Recommendations
        </NavLink>
        <NavLink className="classifyList-ul" to="/Profile/Memories" activeClassName="active">
          Memories
        </NavLink>
        <NavLink className="classifyList-ul" to="/Profile/Terribles" activeClassName="active">
          Terribles
        </NavLink>
      </div>
      <Outlet />

      <ModalGateway>
        {viewerIsOpen && selectedImage && imgviewercaption && (
          <Modal onClose={closeLightbox}>
            <Carousel views={[{ source: selectedImage, caption: imgviewercaption }]} />
          </Modal>
        )}
      </ModalGateway>

    </div>
  );
};
