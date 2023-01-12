import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../products'

export interface ICartProduct {
    product: IProduct;
    quantity: number;
}


export interface ICartState {
    cart: ICartProduct[]
}

const initialState: ICartState = {
    cart: []
}

interface IProductUpdate {
    id: number;
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartProduct>) => {
            const addedBeforeIndex = state.cart.findIndex(product => product.product.id === action.payload.product.id);
            if (addedBeforeIndex >= 0) {
                // is there added product before then update it.
                state.cart[addedBeforeIndex] = action.payload;
            } else {
                state.cart.push(action.payload);
            }
        },
        increaseQuantity: (state, action: PayloadAction<IProductUpdate>) => {
            const productIndex = state.cart.findIndex(item => item.product.id === action.payload.id);
            state.cart[productIndex].quantity += 1;

        },
        decreaseQuantity: (state, action: PayloadAction<IProductUpdate>) => {
            const productIndex = state.cart.findIndex(product => product.product.id === action.payload.id);
            if (productIndex === -1) return
            if (state.cart[productIndex].quantity === 1) state.cart.splice(productIndex, 1);
            else {
                state.cart[productIndex].quantity -= 1;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions

export default cartSlice.reducer