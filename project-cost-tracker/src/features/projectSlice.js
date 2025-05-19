import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],        // { id, name, cost }
  otherCosts: [],   // { id, description, amount }
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setOtherCosts(state, action) {
      state.otherCosts = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    updateItem(state, action) {
      const { id, name, cost } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.name = name;
        item.cost = cost;
      }
    },
    deleteItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    addOtherCost(state, action) {
      state.otherCosts.push(action.payload);
    },
    updateOtherCost(state, action) {
      const { id, description, amount } = action.payload;
      const cost = state.otherCosts.find(c => c.id === id);
      if (cost) {
        cost.description = description;
        cost.amount = amount;
      }
    },
    deleteOtherCost(state, action) {
      state.otherCosts = state.otherCosts.filter(c => c.id !== action.payload);
    },
  },
});

export const {
  setItems, setOtherCosts,
  addItem, updateItem, deleteItem,
  addOtherCost, updateOtherCost, deleteOtherCost,
} = projectSlice.actions;

export default projectSlice.reducer;
