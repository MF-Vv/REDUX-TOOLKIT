import PropTypes from "prop-types"
import { ChevronDown, ChevronUp } from "../data/icons"
import { useDispatch } from "react-redux"
import { removeItem, increase, decrease } from "../features/cart/cartSlice"

const CartItems = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch()

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          Remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increase({ id }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              return dispatch(removeItem(id))
            }
            return dispatch(decrease({ id }))
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

CartItems.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default CartItems
