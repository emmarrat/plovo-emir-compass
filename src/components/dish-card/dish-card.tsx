import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { IDish } from '../../types';



interface Props {
  dish: IDish;
}

const DishCard = ({ dish }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dish/${dish.id}`);
  };

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
          {dish.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DishCard;