// components/ItemList.tsx

import React, { useState } from 'react';

interface Item {
    calories:any;
    carbs:any;
    fat:any;
    protein:any;
    likes:number;
    id: number;
    title: string;
    image: string;
  }
  

interface ItemListProps {
    items: Item[];
    filteredItems: Item[];
    sortType: string;
    setSortType: (sortType: string) => void;
    onSort: (sortField: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ filteredItems, sortType, setSortType, onSort }) => {


    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const field = e.target.value;
        onSort(field);
        setSortType(field)
    }

    return (
        <section>
            <h2>Food List</h2>
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
            <ul>
                {filteredItems.map(item => (
                    <li key={item.id}>
                        <div className="item-image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="item-details">
                            <h3>{item.title}</h3>
                            <p>likes:{item.likes} </p>
                            <p>calories:{item.calories} </p>
                            <p>carbs:{item.carbs} </p>
                            <p>protein:{item.protein} </p>
                            <p>fat:{item.fat}</p>
                            {/* Display other item details as needed */}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ItemList;
