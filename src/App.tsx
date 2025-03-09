import Header from './components/header/header.tsx';
import {Route, Routes} from 'react-router';
import AddDish from './pages/add-dish/add-dish.tsx';
import Home from './pages/home/home.tsx';
import Dish from './pages/dish/dish.tsx';
import {useEffect, useState} from 'react';
import {IBasketState, IDish} from './types.ts';
import {addDishToBasket, syncBasketWithDishes} from './utils/basketHelpers.ts';
import Basket from './pages/basket/basket.tsx';
import {STORAGE_KEY} from './constants.ts';

function App() {
  const [basketState, setBasketState] = useState<IBasketState>(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : {
      items: [],
      totalPrice: 0,
      totalCount: 0
    };
  });

  const handleAddDish = (dish: IDish) => {
    setBasketState(currentState => addDishToBasket(currentState, dish));
  };

  const handleSyncBasketWithDishes = (dishes: IDish[]) => {
    setBasketState(currentState => syncBasketWithDishes(currentState, dishes));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(basketState));
  }, [basketState]);


  return (
    <>
      <Header totalCount={basketState.totalCount}/>
      <div className={'container'}>
        <Routes>
          <Route path="/" element={<Home handleAddDish={handleAddDish}
                                         handleSyncBasketWithDishes={handleSyncBasketWithDishes} />}/>
          <Route path="/add-dish" element={<AddDish/>}/>
          <Route path="/dish/:id" element={<Dish/>}/>
          <Route path="/basket" element={<Basket basketState={basketState}/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
