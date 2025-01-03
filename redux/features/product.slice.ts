import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  quantity: number;
}

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

    increase: (state, action: PayloadAction<CartItem>) => {
      const productItem = state.list.find(
        (el) => el._id === action.payload._id
      );

      if (productItem?.selectedQuantity) {
        productItem.selectedQuantity += action.payload.quantity;
      }

      state.totalPrice = state.list.reduce((prev, current) => {
        return prev + current.selectedQuantity! * current.price!;
      }, 0);
    },

    decrease: (state, action: PayloadAction<CartItem>) => {
      const productItem = state.list.find(
        (el) => el._id === action.payload._id
      );

      if (productItem?.selectedQuantity && productItem?.selectedQuantity > 1) {
        productItem.selectedQuantity -= action.payload.quantity;
      } else {
        state.list = state.list.filter((el) => el._id !== action.payload._id);
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

    removeAll: (state) => {
      state.list = [];
      state.cartQuantity = 0;
      state.totalPrice = 0;
    },
    updateCart: (state, action: PayloadAction<IAddToShoppingCartReqDto[]>) => {
      if (!action.payload || action.payload.length === 0) return;

      action.payload.forEach((newItem) => {
        const item = state.list.find((el) => el._id === newItem._id);

        if (item) {
          item.selectedQuantity = newItem.selectedQuantity;
        } else {
          state.list.push({
            ...newItem,
            selectedQuantity: newItem.selectedQuantity,
          });
        }
      });

      state.cartQuantity = state.list.length;
      state.totalPrice = state.list.reduce((prev, current) => {
        return prev + (current.selectedQuantity ?? 0) * (current.price ?? 0);
      }, 0);
    },
  },
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
