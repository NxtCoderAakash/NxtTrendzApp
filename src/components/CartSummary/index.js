import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const count = cartList.length
      let amount = 0
      cartList.map(item => {
        amount += item.price * item.quantity
        return null
      })
      return (
        <div className="cart-summary-bg-container">
          <h1 className="order-p">
            Order Total: <span className="amount-total">Rs {amount}/-</span>
          </h1>
          <p className="item-count-para">{count} items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
