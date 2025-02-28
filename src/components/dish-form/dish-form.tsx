import styles from './styles.module.css'
import {Button, TextField} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from 'react';
import {IDishShort} from '../../types.ts';

const INITIAL_FORM_STATE: IDishShort = {
  name: '',
  description: '',
  price: 0
}

interface Props {
  onSubmit:(dishData: IDishShort) => void
  loading: boolean
}

const DishForm = ({onSubmit, loading}:Props) => {
  const [formState, setFormState] = useState<IDishShort>(INITIAL_FORM_STATE)

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormState(prevState => ({...prevState, [name]: value}));
  };


  const onFormSubmit = (event:FormEvent) => {
    event.preventDefault()
    onSubmit(formState)
  }

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <TextField
        label={'Dish name'}
        value={formState.name}
        name={'name'}
        onChange={inputChangeHandler}
      />
      <TextField
        label={'Description'}
        value={formState.description}
        name={'description'}
        onChange={inputChangeHandler}
      />
      <TextField
        label={'Price'}
        value={formState.price}
        name={'price'}
        type={'number'}
        onChange={inputChangeHandler}
      />
      <Button
        type={'submit'}
        variant={'contained'}
        loading={loading}
      >
        Add Dish
      </Button>
    </form>
  );
};

export default DishForm;
