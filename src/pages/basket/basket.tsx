import { Box, Container, Typography, List, ListItem, ListItemText, Divider, Link, Button } from '@mui/material';
import { IBasketState } from '../../types';
import { Link as RouterLink } from 'react-router';

interface Props {
  basketState: IBasketState;
}

const Basket = ({ basketState }: Props) => {
  const { items, totalPrice, totalCount } = basketState;

  if (items.length === 0) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Basket is empty
        </Typography>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          <Link to="/" component={RouterLink}>Go to home page</Link>
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Basket
        </Typography>
        <List>
          {items.map((item) => (
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
                      <br />
                      <Typography component="span" variant="body2">
                        Count: {item.count}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Typography variant="h6">
            Total items: {totalCount}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Total price: {totalPrice} som
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/check-out"
            sx={{ mt: 2 }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Basket;
