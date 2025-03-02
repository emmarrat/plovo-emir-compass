import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router';
import { Box, Container, Typography, CircularProgress, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axiosApi from '../../axiosApi';
import { IDish } from '../../types';
import styles from './styles.module.css';

const Dish = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      void fetchDish();
    }
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить это блюдо?');

    if (!isConfirmed) return;

    try {
      setLoading(true);
      await axiosApi.delete(`/dishes/${id}.json`);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении блюда:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <Container maxWidth="md" className={styles.wrapper}>
      <Box >
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
      <Box className={styles.buttonWrapper}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          endIcon={<DeleteForeverIcon/>}
        >
          Delete dish
        </Button>
      </Box>
    </Container>
  );
};

export default Dish;