// components/Header.tsx

import React, { useState } from 'react';

function getNumericValue(value: any) {
    if (typeof value === 'string') {
        const numericPart = value.match(/\d+/);
        return numericPart ? parseFloat(numericPart[0]) : 0;
    } else if (typeof value === 'number') {
        return value;
    }
    return 0;
}


interface Item {
    calories: any;
    carbs: any;
    fat: any;
    protein: any;
    likes: number;
    id: number;
    title: string;
    image: string;
    count: number;
}

interface HeaderProps {
    dietItems: Item[];
    handleRemoveDiet: (item: Item) => void;
    handleAddDiet: (item: Item) => void;
    onSearch: (searchTerm: string) => void;
    setSortType: (sortType: string) => void;
    handleSort: (sortField: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, handleSort, setSortType, dietItems, handleRemoveDiet, handleAddDiet }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDiet, setShowDiet] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

    }

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        onSearch(searchTerm);
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const field = e.target.value;
        handleSort(field);
        setSortType(field)
    }

    const calculateTotalNutrition = () => {
        let totalCalories = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let totalProtein = 0;

        // Iterate over dietItems and accumulate the nutrition values
        dietItems.forEach((item) => {
            totalCalories += getNumericValue(item.calories)*item.count;
            totalCarbs += getNumericValue(item.carbs)*item.count;
            totalFat += getNumericValue(item.fat)*item.count;
            totalProtein += getNumericValue(item.protein)*item.count;
        });

        return {
            calories: totalCalories,
            carbs: totalCarbs,
            fat: totalFat,
            protein: totalProtein,
        };
    };


    return (
        <header>
            <div className='search-container'>
                <h1>Food Page</h1>
                <input
                    type="text"
                    placeholder="Search by name or attribute..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearch}>Search Recipes</button>
            </div>
            <div className="sort-container">
                <label htmlFor="sortSelect">Sort by:</label>
                <select id="sortSelect" onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="title">title</option>
                    <option value="likes">likes</option>
                    <option value="calories">calories</option>
                    <option value="carbs">carbs</option>
                    <option value="protein">protein</option>
                    <option value="fat">fat</option>
                    {/* Add other attributes for sorting as needed */}
                </select>
            </div>
            <div className='diet-container'>
                <button onClick={() => setShowDiet(!showDiet)}>My diet</button>
                {showDiet ? <div className='diet-list'>
                    <ul>
                        {dietItems.map((item, index) => (
                            <li key={index}>
                                {item.title}
                                <div className='diet-item-button'>
                                <button onClick={() => handleRemoveDiet(item)}>-</button>
                                {item.count}
                                <button onClick={() => handleAddDiet(item)}>+</button>
                                </div>
                            </li>))}
                    </ul>
                    <p>
                        Total nutrition:<br/>
                        {calculateTotalNutrition().calories} calories,
                        {calculateTotalNutrition().carbs} carbs,
                        {calculateTotalNutrition().fat} fat,
                        {calculateTotalNutrition().protein} protein
                    </p>

                </div> : ''}
            </div>

        </header>
    );
}

export default Header;
