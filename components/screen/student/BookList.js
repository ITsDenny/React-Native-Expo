import React from "react";
import axios from 'axios';

const getAllBook = async () => {
  try {
    const response = await axios.get('https://incredible-victorious-kingfisher.glitch.me/library/books');
    console.log('API Response:', response.data);
  } catch (error) {
    console.error("Eror fetch:", error);
  }
};
