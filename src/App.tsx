// App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import './App.css';


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

// get numberic value
function getNumericValue(value: any) {
  if (typeof value === 'string') {
    const numericPart = value.match(/\d+/);
    return numericPart ? parseFloat(numericPart[0]) : 0;
  } else if (typeof value === 'number') {
    return value;
  }
  return 0;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [sortType, setSortType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Fetch data from API endpoint using Axios
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex',
        params: {
          limitLicense: 'false',
          offset: offset,
          number: '100',
          minIron: '0',
          minCalcium: '0',
          maxVitaminB2: '1000',
          maxMagnesium: '1000',
          minPotassium: '0',
          maxVitaminB6: '1000',
          intolerances: 'peanut, shellfish',
          maxVitaminB5: '1000',
          minFolicAcid: '0',
          minVitaminA: '0',
          maxSodium: '1000',
          maxSugar: '1000',
          maxVitaminA: '5000',
          maxFluoride: '1000',
          minFluoride: '0',
          minVitaminB1: '0',
          minCholine: '0',
          ranking: '2',
          minFat: '5',
          maxVitaminB1: '1000',
          minVitaminB12: '0',
          maxSelenium: '1000',
          minZinc: '0',
          minFolate: '0',
          maxManganese: '1000',
          maxVitaminB12: '1000',
          maxPotassium: '1000',
          maxIron: '1000',
          minSelenium: '0',
          minVitaminK: '0',
          maxFiber: '1000',
          minSodium: '0',
          maxCopper: '1000',
          minCalories: '150',
          maxCholine: '1000',
          minCholesterol: '0',
          maxVitaminE: '1000',
          minProtein: '5',
          minVitaminB3: '0',
          minVitaminB6: '0',
          maxIodine: '1000',
          excludeIngredients: 'coconut, mango',
          maxProtein: '100',
          minMagnesium: '0',
          minCarbs: '5',
          cuisine: 'american',
          maxCaffeine: '1000',
          maxSaturatedFat: '50',
          maxVitaminK: '1000',
          minAlcohol: '0',
          minIodine: '0',
          minSaturatedFat: '0',
          includeIngredients: 'onions, lettuce, tomato',
          minVitaminE: '0',
          maxCalcium: '1000',
          minFiber: '0',
          minVitaminC: '0',
          maxZinc: '1000',
          maxCalories: '1500',
          maxAlcohol: '1000',
          minPhosphorus: '0',
          minVitaminD: '0',
          minVitaminB2: '0',
          minSugar: '0',
          maxFolate: '1000',
          type: 'main course',
          maxCholesterol: '1000',
          maxVitaminB3: '1000',
          minCaffeine: '0',
          minVitaminB5: '0',
          maxFolicAcid: '1000',
          maxCarbs: '100',
          maxVitaminD: '1000',
          equipment: 'pan',
          maxFat: '100',
          minCopper: '0',
          maxVitaminC: '1000',
          maxPhosphorus: '1000',
          minManganese: '0',
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
    let sorted = [...items];

    switch (type) {
      case 'calories':
        sorted.sort((a, b) => getNumericValue(a.calories) - getNumericValue(b.calories));
        break;
      case 'carbs':
        sorted.sort((a, b) => getNumericValue(a.carbs) - getNumericValue(b.carbs));
        break;
      case 'fat':
        sorted.sort((a, b) => getNumericValue(a.fat) - getNumericValue(b.fat));
        break;
      case 'protein':
        sorted.sort((a, b) => getNumericValue(a.protein) - getNumericValue(b.protein)).reverse();
        break;
      case 'likes':
        sorted.sort((a, b) => a.likes - b.likes);
        break;
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
      <ItemList
        items={items}
        filteredItems={filteredItems}
        sortType={sortType}
        offset={offset}
        setSortType={setSortType} onSort={handleSort} setOffset={setOffset} />
      <AddItemForm onAddItem={handleAddItem} />
    </div>
  );
}

export default App;
