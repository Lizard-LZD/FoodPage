// components/Header.tsx

import React, { useState } from 'react';

interface HeaderProps {
    onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

    }

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        onSearch(searchTerm);
    }

    return (
        <header>
            <h1>Dynamic Food Page</h1>
            <input
                type="text"
                placeholder="Search by name or attribute..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search Recipes</button>

        </header>
    );
}

export default Header;
