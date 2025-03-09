import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Container, Typography } from '@mui/material';
import { IBasketState, IOrder } from '../../types';
import OrderItems from '../../components/order-items/OrderItems';
import OrderForm from '../../components/order-form/OrderForm';
import axiosApi from '../../axiosApi';
interface Props {
  basketState: IBasketState;
  updateItemCount: (dishId: string, newCount: number) => void;
  handleClearBasket: () => void;
}
interface IOrderForm {
  name: string;
  phone: string;
  address: string;
}

const CheckOut = ({ basketState, updateItemCount, handleClearBasket }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IOrderForm>({
    name: '', 
    phone: '',
    address: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const order: IOrder = {
        ...basketState,
        orderInfo: formData,
      };
  
      await axiosApi.post('/orders.json', order);
      handleClearBasket();
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Checkout
        </Typography>
        <OrderItems
          basketState={basketState}
          updateItemCount={updateItemCount}
        />
        <OrderForm
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
};

export default CheckOut; 