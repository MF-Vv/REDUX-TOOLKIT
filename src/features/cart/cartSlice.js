import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import cartItems from "../../data/cartItems"
import axios from "axios"
import { openModal } from "../modal/modalSlice"
const url = "https://www.course-api.com/react-useReducer-cart-project"

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url)

      return resp.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue("error something went wrong")
    }
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemID = action.payload
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemID
      })
    },
    increase: (state, { payload: { id } }) => {
      const cartItem = state.cartItems.find((item) => item.id === id)
      cartItem.amount += 1
    },
    decrease: (state, { payload: { id } }) => {
      const cartItem = state.cartItems.find((item) => item.id === id)
      cartItem.amount -= 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        total += item.price * item.amount
        amount += item.amount
      })
      state.total = parseFloat(total.toFixed(2))
      state.amount = amount
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
