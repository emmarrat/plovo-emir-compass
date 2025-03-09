import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IBasketState } from '../../types';

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

  const handleUpdateCount = (dishId: string, currentCount: number, increment: boolean) => {
    const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);
    updateItemCount(dishId, newCount);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Оформление заказа
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Выбранные блюда
          </Typography>
          <List>
            {basketState.items.map((item) => (
              <Box key={item.dish.id}>
                <ListItem>
                  <ListItemText
                    primary={item.dish.name}
                    secondary={`${item.dish.price} som`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateCount(item.dish.id, item.count, false)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.count}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateCount(item.dish.id, item.count, true)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">
              Итого: {basketState.totalPrice} som
            </Typography>
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Информация для доставки
          </Typography>
          <TextField
            fullWidth
            required
            label="Имя получателя"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Адрес доставки"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            Подтвердить заказ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckOut; 