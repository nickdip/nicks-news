
import ClipLoader from "react-spinners/ClipLoader";
import React, { useState} from 'react'
import useLoading from '../hooks/useLoading'
import '../styles/Loading.css'
  
export default function Loading({childLoading}) {  
    const { isLoading} = useLoading();

    return (
      <div className="loading">
        <p>Loading...</p>
        <ClipLoader
          size={150}
          color={"#123abc"}
          loading={isLoading || childLoading}
        />
      </div>
    );
  }

