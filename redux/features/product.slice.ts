import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  list: IShoppingCartProductList[];
  cartQuantity: number;
  totalPrice: number;
}

const initialState: ProductState = {
  list: [],
  cartQuantity: 0,
  totalPrice: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IShoppingCartProductList>) => {
      const productItem = state.list.find(
        (el) => el._id === action.payload._id
      );

      if (!productItem) {
        state.list.push({
          ...action.payload,
          selectedQuantity: action.payload.selectedQuantity,
        });
        state.cartQuantity++;
      }

      state.totalPrice = state.list.reduce((prev, current) => {
        return prev + current.selectedQuantity! * current.price!;
      }, 0);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const productItem = state.list.find((el) => el._id === action.payload);
      if (productItem && productItem.selectedQuantity) {
        productItem.selectedQuantity++;
      }

      state.totalPrice = state.list.reduce((prev, current) => {
        return prev + current.selectedQuantity! * current.price!;
      }, 0);
    },
    decreaseProduct: (state, action: PayloadAction<string>) => {
      const productItem = state.list.find((el) => el._id === action.payload);
      if (
        productItem &&
        productItem.selectedQuantity &&
        productItem.selectedQuantity > 1
      ) {
        productItem.selectedQuantity--;
      } else {
        state.list = state.list.filter((el) => el._id !== action.payload);
        state.cartQuantity--;
      }

      state.totalPrice = state.list.reduce((prev, current) => {
        return prev + current.selectedQuantity! * current.price!;
      }, 0);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el._id !== action.payload);
      state.cartQuantity--;

      state.totalPrice = state.list.reduce((prev, current) => {
        return prev + current.selectedQuantity! * current.price!;
      }, 0);
    },
  },
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
