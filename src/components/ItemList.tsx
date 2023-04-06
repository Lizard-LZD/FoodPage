// components/ItemList.tsx

import React, { useState } from 'react';

interface Item {
    id: number;
    title: string;
    image: string;
  }

interface ItemListProps {
    items: Item[];
    sortType: string;
    onSort: (sortField: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, sortType, onSort }) => {

    const [sortField, setSortField] = useState('');

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const field = e.target.value;
        setSortField(field);
        onSort(field);
    }

    const sortedItems = [...items].sort((a, b) => {
        if (sortField === 'id') {
            return a.id - b.id;
        } else if (sortField === 'title') {
            return a.title.localeCompare(b.title);
        } else {
            // Sort by other attributes as needed
            return 0;
        }
    });

    return (
        <section>
            <h2>Food List</h2>
            <div className="sort-container">
                <label htmlFor="sortSelect">Sort by:</label>
                <select id="sortSelect" value={sortField} onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="id">ID</option>
                    <option value="title">title</option>
                    {/* Add other attributes for sorting as needed */}
                </select>
            </div>
            <ul>
                {sortedItems.map(item => (
                    <li key={item.id}>
                        <div className="item-image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="item-details">
                            <h3>{item.title}</h3>
                            {/* Display other item details as needed */}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ItemList;
