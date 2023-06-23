// components/AddItemForm.tsx

import React, { useState } from 'react';

interface Item {
    calories:number;
    carbs:string;
    fat:string;
    likes:number;
    protein:string;
    id: number;
    title: string;
    image: string;
  }

interface AddItemFormProps {
    onAddItem: (item: Item) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
    const [title, settitle] = useState('');
    const [image, setImage] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        settitle(e.target.value);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform form validation as needed
        const newItem: Item = {
            id: Date.now(),
            title,
            image,
            calories: 0,
            carbs: '',
            fat: '',
            likes: 0,
            protein: ''
        };
        onAddItem(newItem);
        // Reset form fields
        settitle('');
        setImage('');
    }

    return (
        <section>
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titleInput">Title:</label>
                    <input type="text" id="titleInput" value={title} onChange={handleTitleChange} />
                </div>
              
                <div className="form-group">
                    <label htmlFor="imageInput">Image URL:</label>
                    <input type="text" id="imageInput" value={image} onChange={handleImageChange} />
                </div>
                <button type="submit">Add</button>
            </form>
        </section>
    );
}

export default AddItemForm;
