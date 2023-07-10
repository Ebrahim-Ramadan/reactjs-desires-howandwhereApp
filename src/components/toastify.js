import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const toastify = (ImageSrc) => {
    toast.success(`${ImageSrc}`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 800,
      theme: 'dark'
    });
  };

export const Toast = () => {
      
  }