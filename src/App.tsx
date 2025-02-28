import Header from './components/header/header.tsx';
import {Route, Routes} from 'react-router';
import AddDish from './pages/add-dish/add-dish.tsx';
import Home from './pages/home/home.tsx';

function App() {
  return (
    <>
      <Header/>
      <div className={'container'}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-dish" element={<AddDish/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
