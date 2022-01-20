import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let item = action.payload.product;
      let isExist = false;
      state.products.map(p => {
        if (
          p._id === item._id &&
          p.color === item.color &&
          p.size === item.size
        ) {
          p.quantity += item.quantity;
          isExist = true;
          return (state.total += action.payload.price);
        }
      });
      if (!isExist) {
        state.products.push(action.payload.product);
        state.quantity += 1;
        state.total += action.payload.price;
      }
    },

    removeAll: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    removeAmount: (state, action) => {
      state.total -=
        state.products[action.payload].price *
        state.products[action.payload].quantity;
      state.products.splice(action.payload, 1);
      state.quantity -= 1;
    },
    changeAmount: (state, action) => {
      switch (action.payload.type) {
        case "ADD":
          state.total += state.products[action.payload.index].price;
          state.products[action.payload.index].quantity += 1;
          break;

        case "SUBTRACT":
          state.total -= state.products[action.payload.index].price;
          state.products[action.payload.index].quantity -= 1;
          break;
        default:
          return;
      }
    },
  },
});

export const {
  addProduct,
  removeAmount,
  changeAmount,
  addToExistingProduct,
  removeAll,
} = cartSlice.actions;
export default cartSlice.reducer;
