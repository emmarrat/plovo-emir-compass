import Header from './components/header/header.tsx';
import {Route, Routes} from 'react-router';
import AddDish from './pages/add-dish/add-dish.tsx';
import Home from './pages/home/home.tsx';
import Dish from './pages/dish/dish.tsx';

function App() {
  return (
    <>
      <Header/>
      <div className={'container'}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-dish" element={<AddDish/>}/>
          <Route path="/dish/:id" element={<Dish/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
