import {useState} from 'react';
import DishForm from '../../components/dish-form/dish-form.tsx';
import {useNavigate} from 'react-router';
import {IDishShort} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

const AddDish = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onAddDishClick = async (dishData: IDishShort) => {
    setLoading(true);
    try {
      await axiosApi.post('/dishes.json', dishData);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  };
  return (
    <div>
      <DishForm onSubmit={onAddDishClick} loading={loading}/>
    </div>
  );
};

export default AddDish;