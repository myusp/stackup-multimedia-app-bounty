import React, { useState } from 'react';
import { useEffect, useRef } from 'react';

const DropdownFilter = ({ onChange = () => { }, styleButton = {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(['document', 'audio', 'image', 'video'])
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (typeof onChange == "function") {
            onChange(selectedOptions)
        }
    }, [selectedOptions])


    return (
        <div className="dropdown" ref={dropdownRef} style={styleButton}>
            <button onClick={toggleDropdown} className='btn-dropdown'>{selectedOptions.length != 0 ? `${selectedOptions.length} Selected` : "Filter"}</button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((d, i) => (<li
                        key={i}
                    >
                        <input
                            type="checkbox"
                            id={"opt-" + i}
                            checked={selectedOptions.includes(d)}
                            onChange={() => handleOptionChange(d)}
                        />
                        <label style={{ marginLeft: 10 }} htmlFor={"opt-" + i}>{d}</label>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownFilter;
