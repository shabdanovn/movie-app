import React from 'react';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import './Footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <ArrowCircleUpIcon 
                style={{cursor: "pointer"}} 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                fontSize='large'/>
        </div>
    );
};

export default Footer;