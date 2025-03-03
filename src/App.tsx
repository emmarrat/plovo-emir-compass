import Header from './components/header/header.tsx';
import {Route, Routes} from 'react-router';
import AddDish from './pages/add-dish/add-dish.tsx';
import Home from './pages/home/home.tsx';
import Dish from './pages/dish/dish.tsx';
import {useState} from 'react';
import {IBasketState, IDish} from './types.ts';
import {addDishToBasket} from './utils/basketHelpers.ts';

function App() {
  const [basketState, setBasketState] = useState<IBasketState>({
    items: [],
    totalPrice: 0,
    totalCount: 0
  });

  const handleAddDish = (dish: IDish) => {
    setBasketState(currentState => addDishToBasket(currentState, dish));
  }

  return (
    <>
      <Header totalCount={basketState.totalCount}/>
      <div className={'container'}>
        <Routes>
          <Route path="/" element={<Home handleAddDish={handleAddDish} />}/>
          <Route path="/add-dish" element={<AddDish/>}/>
          <Route path="/dish/:id" element={<Dish />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
