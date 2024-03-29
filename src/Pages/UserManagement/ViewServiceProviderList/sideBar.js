import React, { useEffect, useRef } from 'react';
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ onClose, sortBy, onSort, resetFilters }) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        // Function to handle clicks outside the sidebar
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose(); // Close the sidebar
            }
        };

        // Add event listener to detect clicks outside the sidebar
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Cleanup by removing the event listener when the component unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="sidebar" ref={sidebarRef}>
            <div className='sidebar-header'>
                <div className='filterHeader'>
                    Filter by
                    <button onClick={onClose} className='close-button'>
                        <FaTimes />
                    </button>
                </div>
            </div>
            <div className='sidebar-body'>
                <div className="dropdown-container">
                    <label htmlFor="category-dropdown">Category</label>
                    <select id="category-dropdown">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        {/* Add more options as needed */}
                    </select>
                    <label htmlFor="location-dropdown">Location</label>
                    <select id="location-dropdown1">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        {/* Add more options as needed */}
                    </select>
                    <div className="checkbox-container">
                        <div className="label-and-buttons-container">
                            <label htmlFor="AlphabeticalOrder">Alphabetical Order</label>
                            <div className="sorting-buttons">
                                <button
                                    className={`sort-button ${sortBy === 'asc' && 'active'}`}
                                    onClick={() => onSort('asc')}
                                >
                                    ▲
                                </button>
                                <button
                                    className={`sort-button ${sortBy === 'desc' && 'active'}`}
                                    onClick={() => onSort('desc')}
                                >
                                    ▼
                                </button>
                            </div>
                        </div>
                        <div className="flagged-providers">
                            <label htmlFor="flagged-providers-checkbox">Flagged Providers</label>
                            <input className='flaggedCheckbox' type="checkbox" id="flagged-providers-checkbox" />
                        </div>
                    </div>
                </div>
                <div className="provider-sidebar-buttons">
                    <button className="provider-reset-button" onClick={resetFilters}>Reset</button>
                    <button className="provider-apply-button">Apply</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
