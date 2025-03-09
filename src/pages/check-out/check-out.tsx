import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { IBasketState } from '../../types';
import OrderItems from '../../components/order-items/OrderItems';
import OrderForm from '../../components/order-form/OrderForm';

interface Props {
  basketState: IBasketState;
  updateItemCount: (dishId: string, newCount: number) => void;
}

interface OrderForm {
  name: string;
  phone: string;
  address: string;
}

const CheckOut = ({ basketState, updateItemCount }: Props) => {
  const [formData, setFormData] = useState<OrderForm>({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement order submission
    console.log('Order submitted:', { items: basketState.items, ...formData });
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