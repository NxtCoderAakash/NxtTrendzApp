import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const existingList = [...prevState.cartList]
      const updatedList = existingList.map(item => {
        if (item.id === id) {
          const quantity = item.quantity + 1
          return {...item, quantity}
        }
        return {...item}
      })
      return {cartList: updatedList}
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      let flag = false
      const existingList = [...prevState.cartList]
      const updatedList = existingList.map(item => {
        if (item.id === id) {
          if (item.quantity === 1) {
            flag = true
          }
          const quantity = item.quantity - 1
          return {...item, quantity}
        }
        return {...item}
      })
      if (flag) {
        const newList = updatedList.filter(item => item.id !== id)
        return {cartList: newList}
      }
      return {cartList: updatedList}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => {
      const updatedList = prevState.cartList.filter(item => item.id !== id)
      return {cartList: updatedList}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      let flag = false
      const existingList = [...prevState.cartList]
      const updatedList = existingList.map(item => {
        if (item.id === product.id) {
          flag = true
          const quantity = item.quantity + product.quantity
          return {...item, quantity}
        }
        return {...item}
      })
      if (flag) {
        return {cartList: [...updatedList]}
      }
      return {cartList: [...prevState.cartList, product]}
    })

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
