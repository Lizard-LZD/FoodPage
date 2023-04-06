// App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import './App.css';


interface Item {
  id: number;
  title: string;
  image: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [sortType, setSortType] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    // Fetch data from API endpoint using Axios
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        params: {
          query: prompt
        },
        headers: {
          'X-RapidAPI-Key': 'ab27fce80emsh4c41995d3b1e0b9p19f53cjsn0f8da51a9982',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };
      axios.request(options).then(function (response) {

        setItems(response.data.results);
        setFilteredItems(response.data.results);
        console.log(items);
      }).catch(function (error) {
        console.error(error);
      });
    };
    fetchData();
  }, [prompt]);

  const handleSearch = (searchTerm: string) => {
    setPrompt(searchTerm)
    // // Filter items based on search term
    // const filtered = items.filter(item =>
    //   item.title.toLowerCase().includes(searchTerm.toLowerCase())
    //   // Add additional conditions for other attributes to be filtered
    // );
    // setFilteredItems(filtered);
  }

  const handleSort = (type: string) => {
    // Sort items based on sort type
    let sorted = [...filteredItems];
    if (type === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === 'id') {
      sorted.sort((a, b) => a.id - b.id);
    }
    // Add additional conditions for other attributes to be sorted
    setSortType(type);
    setFilteredItems(sorted);
  }

  const handleAddItem = (newItem: any) => {
    // Add new item to the list
    setItems([...items, newItem]);
    setFilteredItems([...items, newItem]);
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      <ItemList items={items} sortType={sortType} onSort={handleSort} />
      <AddItemForm onAddItem={handleAddItem} />
    </div>
  );
}

export default App;
