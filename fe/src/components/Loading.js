import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";



const Loading = () => {
    return(
    <div align='center'>
        <Loader
         type="Oval"
         color="#00BFFF"
         height={80}
         width={80}
         timeout={0} //3 secs
        
        />

    </div>
    );
}

export default Loading;