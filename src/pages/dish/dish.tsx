import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import axiosApi from '../../axiosApi';
import { IDish } from '../../types';

const Dish = () => {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<IDish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true);
        const { data } = await axiosApi.get<IDish>(`/dishes/${id}.json`);
        setDish(data);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDish();
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!dish) {
    return (
      <Container>
        <Typography variant="h6" align="center">
          Dish not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" component="h1" gutterBottom>
         Name: {dish.name}
        </Typography>
        <Typography variant="body1">
          Description: {dish.description}
        </Typography>
         <Typography variant="body1" >
          Price: {dish.price} som
        </Typography>
      </Box>
    </Container>
  );
};

export default Dish;