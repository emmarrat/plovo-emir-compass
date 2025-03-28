import {Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import { useNavigate } from 'react-router';
import { IDish } from '../../types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



interface Props {
  dish: IDish;
  handleAddDish: (dish: IDish) => void
}

const DishCard = ({ dish, handleAddDish }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dish/${dish.id}`);
  };

  const handleAddDishToBasket = (e: React.MouseEvent<HTMLButtonElement>, dish: IDish) => {
    e.stopPropagation();
    handleAddDish(dish);
  }


  return (
    <Card 
      sx={{ 
        minWidth: 275, 
        margin: 2, 
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6
        }
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {dish.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dish.price} soms
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={(e) => handleAddDishToBasket(e, dish)}
          endIcon={<AddShoppingCartIcon/>}
        >
          Add to basket
        </Button>
      </CardActions>

    </Card>
  );
};

export default DishCard;