import {useCallback, useEffect, useState} from 'react';
import {IDish, IDishesList} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import DishCard from '../../components/dish-card/dish-card.tsx';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      const dishesResponse = await axiosApi.get<IDishesList | null>('/dishes.json');
      const dishes = dishesResponse.data;

      if (!dishes) {
        return;
      }
      const newDishes:IDish[] = Object.keys(dishes).map(key => {
        const dish = dishes[key];
        return {
          ...dish,
          id: key,
        };
      });
      setDishes(newDishes);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    void fetchDishes()
  }, [fetchDishes]);

  console.log('dishes',dishes)

  return (
    <div>
      {loading ? <CircularProgress /> : (
        <>
          {dishes.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
