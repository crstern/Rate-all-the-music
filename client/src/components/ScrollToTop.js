import React, {useEffect, useState} from 'react';
import {useWindowScroll} from 'react-use';

const ScrollToTop = () => {

    const {y: pageYOffset} = useWindowScroll();
    const [visible, setVisibility] = useState(false);
    
    useEffect(() => {
        if (pageYOffset > 300) {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
    },[pageYOffset])

    const scrollToop = () => window.scrollTo({top: 0, behavior: 'smooth'});

    if(!visible) {
        return false;
    }

    return (
        <div className="scroll-to-top cursor-pointer text-center" onClick={scrollToop}>
            <i className='icon fas icon-arrow-up'></i>
        </div>
    );
};

export default ScrollToTop