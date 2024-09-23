/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const TitlePrimary = ({ words1 ='lorem', words2 = 'ipsum', className, dynamic }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        if (dynamic) {
            const interval = setInterval(() => {
                setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words1.length);
            }, 2000); // Cambia cada 2 segundos

            return () => clearInterval(interval);
        }
    }, [dynamic, words1.length]);

    return (
        <div className={`font-ebGaramond text-marron-200 ${className}`}>
            <p className='text-4xl font-medium lg:text-6xl md:text-5xl'>{words1[dynamic ? currentWordIndex : 0]}</p>
            <p className='text-5xl italic font-bold leading-5 ml-7 md:ml-10 lg:text-7xl md:text-6xl lg:leading-9'>{words2[dynamic ? currentWordIndex : 0]}</p>
        </div>
    );
};

export default TitlePrimary;