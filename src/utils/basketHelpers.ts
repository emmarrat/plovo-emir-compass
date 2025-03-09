import { IBasketState, IDish, IBasket } from '../types'

export const addDishToBasket = (currentState: IBasketState, dish: IDish): IBasketState => {
  const existingItemIndex = currentState.items.findIndex((item) => {
    return item.dish.id === dish.id
  })

  let newItems: IBasket[]

  if (existingItemIndex !== -1) {
    newItems = currentState.items.map((item, index) => {
      if (index === existingItemIndex) {
        return {
          ...item,
          count: item.count + 1
        }
      }
      return item
    })
  } else {
    newItems = [
      ...currentState.items,
      { dish, count: 1 }
    ]
  }

  const totalCount = newItems.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  const totalPrice = newItems.reduce((sum, item) => {
    return sum + (item.dish.price * item.count)
  }, 0)

  return {
    items: newItems,
    totalCount,
    totalPrice,
  }
}

export const syncBasketWithDishes = (currentState: IBasketState, dishes: IDish[]): IBasketState => {
  const validItems = currentState.items.filter(item => {
    return dishes.some(dish => dish.id === item.dish.id);
  });

  const updatedItems = validItems.map(item => {
    const updatedDish = dishes.find(dish => dish.id === item.dish.id);
    if (!updatedDish) return item;
    return {
      ...item,
      dish: updatedDish
    };
  });

  const totalCount = updatedItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = updatedItems.reduce((sum, item) => sum + (item.dish.price * item.count), 0);

  return {
    items: updatedItems,
    totalCount,
    totalPrice
  };
}

export const updateItemCountInBasket = (currentState: IBasketState, dishId: string, newCount: number): IBasketState => {
  const updatedItems = currentState.items
    .map(item => {
      if (item.dish.id === dishId) {
        return {
          ...item,
          count: newCount
        }
      }
      return item
    })
    .filter(item => item.count > 0);  

  const totalCount = updatedItems.reduce((sum, item) => sum + item.count, 0)
  const totalPrice = updatedItems.reduce((sum, item) => sum + (item.dish.price * item.count), 0)

  return {
    items: updatedItems,
    totalCount,
    totalPrice
  }
}