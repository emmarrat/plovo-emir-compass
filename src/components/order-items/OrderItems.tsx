import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IBasketState } from '../../types';

interface OrderItemsProps {
  basketState: IBasketState;
  updateItemCount: (dishId: string, newCount: number) => void;
}

const OrderItems = ({ basketState, updateItemCount }: OrderItemsProps) => {
  const handleUpdateCount = (dishId: string, currentCount: number, increment: boolean) => {
    const newCount = increment ? currentCount + 1 : currentCount - 1;
    updateItemCount(dishId, newCount);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Selected dishes
      </Typography>
      <List>
        {basketState.items.map((item) => (
          <Box key={item.dish.id}>
            <ListItem>
              <ListItemText
                primary={item.dish.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {item.dish.description}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Price: {item.dish.price} som
                    </Typography>
                  </>
                }
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
          Total dishes: {basketState.totalCount}
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          Total price: {basketState.totalPrice} som
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderItems; 