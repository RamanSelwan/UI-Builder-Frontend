import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getApiEndpoint } from '../APIConnect';

const visibleCount = 6; // ya jitne ek bar me dikhane hain

const Icon = () => {
    const [cards, setCards] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        fetch(getApiEndpoint('cout'))
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data && Array.isArray(data.data.cards)) {
                    setCards(data.data.cards);
                }
                console.log('catagoery API',data)
            });
    }, []);

    const handlePrev = () => {
        setStartIndex(prev =>
            prev === 0 ? Math.max(cards.length - visibleCount, 0) : prev - 1
        );
    };

    const handleNext = () => {
        setStartIndex(prev =>
            prev >= cards.length - visibleCount ? 0 : prev + 1
        );
    };

    const visibleCards = cards.slice(startIndex, startIndex + visibleCount);

    return (
        <div className='flex flex-row justify-center items-center gap-18 mt-10 mb-50 w-320 pl-10'>
            <div className='mb-10'>
                <IoIosArrowBack
                    className='text-black hover:text-[#b21858] cursor-pointer text-xl'
                    onClick={handlePrev}
                />
            </div>
            {visibleCards.map((card, idx) => (
                <div key={idx} className='w-40 h-30 flex flex-col items-center'>
                    <img
                        src={`http://localhost:5002/uploads/${card.image}`}
                        alt="Icon"
                        className="w-50 h-20 object-cover opacity-80"
                    />
                    {/* Optionally show items */}
                    <ul>
                        {card.items?.map((item, i) => (
                            <li key={i} style={{ color: card.color, fontFamily: card.font, ...card.style }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className='mb-10'>
                <IoIosArrowForward
                    className='text-black hover:text-[#b21858] cursor-pointer text-xl'
                    onClick={handleNext}
                />
            </div>
        </div>
    );
};

export default Icon;