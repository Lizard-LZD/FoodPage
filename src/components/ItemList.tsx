// components/ItemList.tsx

import React, { useState } from 'react';

interface Item {
    calories: any;
    carbs: any;
    fat: any;
    protein: any;
    likes: number;
    id: number;
    title: string;
    image: string;
}


interface ItemListProps {
    items: Item[];
    filteredItems: Item[];
    dietItems: Item[];
    sortType: string;
    offset: number;
    setOffset: (offset: number) => void;
    handleRemoveDiet: (item: Item) => void;
    handleAddDiet: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ filteredItems, offset, setOffset, handleRemoveDiet, handleAddDiet }) => {



    return (
        <section>
            <h2>Food List</h2>

            <ul>
                {filteredItems.slice(offset, offset + 10).map(item => (
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

                        <div className='item-button'>
                            <button onClick={() => handleRemoveDiet(item)}>-</button>
                            { }
                            <button onClick={() => handleAddDiet(item)}>+</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className='page-button'>
                <button onClick={() => { setOffset(offset >= 10 ? offset - 10 : 0); window.scrollTo({ top: 0, behavior: "smooth" }); }}>《</button>
                <p>{offset / 10 + 1}</p>
                <button onClick={() => { setOffset(offset >= 90 ? 0 : offset + 10); window.scrollTo({ top: 0, behavior: "smooth" }); }}>》</button>
            </div>
        </section>
    );
}

export default ItemList;
