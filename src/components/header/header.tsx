import {AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link, useNavigate} from 'react-router';
import styles from './styles.module.css';

interface Props {
  totalCount: number;
}

const Header = ({totalCount}: Props) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleHomeClick}>
          <FoodBankIcon fontSize="large" sx={{mr: 1}}/>
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{flexGrow: 1, cursor: 'pointer', display: 'flex', alignItems: 'center'}}
          onClick={handleHomeClick}
        >
          My Plovo App
        </Typography>
        <div className={styles.linksWrapper}>
          <Link to="/basket" style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography variant="h6" component="div" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <ShoppingBasketIcon/> {totalCount}
            </Typography>
          </Link>
          <Link to="/add-dish" style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography variant="h6" component="div" sx={{cursor: 'pointer'}}>
              Add dish
            </Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>

  );
};

export default Header;