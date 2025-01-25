import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Ajoute un article au panier
    addItem: (state, action) => {
      const newItem = action.payload;

      // Vérifie si l'article est déjà dans le panier
      const existingItemIndex = state.items.findIndex(item => item.name === newItem.name);

      if (existingItemIndex >= 0) {
        // Si l'article est déjà présent, on met à jour la quantité
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Si l'article n'est pas encore dans le panier, on l'ajoute avec une quantité de 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    // Supprime un article du panier par son nom
    removeItem: (state, action) => {
      const itemName = action.payload;

      // Filtre l'article à supprimer
      state.items = state.items.filter(item => item.name !== itemName);
    },

    // Met à jour la quantité d'un article dans le panier
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      // Trouve l'article et met à jour sa quantité
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;