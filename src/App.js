import React, { Component } from 'react';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Item from './components/Item/Item';
import { slide as Menu } from "react-burger-menu";
import swal from 'sweetalert';
import './App.css';

export class App extends Component {
  state = {
    products: [],
    loading: true,
    cart: [],
    showMenu: false,
    totalPrice: 0,
    currencies: [],
    defaultCurrency: "USD"
  }

  componentDidMount() {
    this.addToCart = this.addToCart.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addQtty = this.addQtty.bind(this);
    this.redQtty = this.redQtty.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.currencyChange = this.currencyChange.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.getTotal = this.getTotal.bind(this);

    console.log("Did mount");
    this.loadProducts();
    this.getCurrencies()
    
  }

  // loads products from api
  loadProducts(curr) {
    const url = "https://pangaea-interviews.now.sh/api/graphql";
    let currency;
    if(curr) {
      currency = curr
    }
    else {
      currency = this.state.defaultCurrency
    }

    fetch(url, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ products { id title price (currency: ${currency}) image_url } }` }),
    })
      .then(data => data.json())
      .then(data => {
        console.log(data.data);
        this.setState({
          products: data.data.products
        })
      })
      .catch( error => {
        console.log(error)
      })
  }

  // loads currencies from api
  getCurrencies() {
    const url = "https://pangaea-interviews.now.sh/api/graphql";

    fetch(url, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ currency }` }),
    })
      .then(data => data.json())
      .then(data => {
        console.log(data.data);
        let currencies = data.data.currency;
        // currencies.forEach( currency => {
        //   currencies.push({
        //     label: currency,
        //     value: currency
        //   })
        // })
        this.setState({
          currencies: currencies
        })
      })
      .catch( error => {
        console.log(error)
      })
  }

  // add item to cart
  addToCart(item, index) {
    let cart = this.state.cart;
    if(cart.includes(item)) {
      // index of item in cart
      let cartIndx = cart.indexOf(item);
      cart[cartIndx].quantity++;

      // adding to quantity if already exists in cart
      this.setState({
        cart: cart
      })
      this.getTotal(this.state.cart)
      return
    }
    // else{ //add it to cart for the first time
      item['quantity'] = 1;
      cart.push(item);
      this.setState({
        cart: cart
      })
      this.getTotal(this.state.cart);

    this.setState({
      showMenu: true
    })
    console.log(this.state.cart)
    
  }

  // Note that the add and reduce qtty methods only works from inside the cart
  // increases product quantity on click of the +button
  addQtty(item, index) {
    let cart = [...this.state.cart];
    // index of item in products array
    let prodIndx = this.state.products.indexOf(item);
    console.log(this.state.products[prodIndx])

    // index of item in cart
    let cartIndx = cart.indexOf(item);
    cart[cartIndx].quantity++;
    // cart[cartIndx].price = initPrice * item.quantity;
    
    this.setState({
      cart: cart
    })
    console.log(cart[cartIndx].price)

    // this.calcTotal(cart[cartIndx].price);
  }

  // reduces product quantity on click of the - button
  redQtty(item, index) {
    if(item.quantity === 1) {
      this.removeItem(item)
      // alert("Zero");
    }
    else {
      let cart = [...this.state.cart];
      // index of item in cart
      let cartIndx = cart.indexOf(item);
      cart[cartIndx].quantity > 0? cart[cartIndx].quantity-- : cart[cartIndx].quantity = 0;
      // cart[cartIndx].price = cart[cartIndx].price * cart[cartIndx].quantity;
      this.setState({
        cart: cart
      })
    }

      // this.calcTotal(cart[cartIndx].price * -1) //converted to negative number

  }

  // removes item from cart
  removeItem(item) {
    console.log(item)
    let cart = this.state.cart;
    cart = cart.filter((items)=> {
      return items !== item
    })
      this.setState({
        cart: cart
      })

      // calculates total
      // this.calcTotal();
    }

  toggleMenu() {
    // console.log(event);
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  currencyChange(event) {
    console.log(event.target.value);
    let selected_currency = event.target.value
    this.setState({
      defaultCurrency: selected_currency
    })
    this.loadProducts(selected_currency);
    swal("Currency changed!", "Readd items to cart to get updated prices", "warning")
  }

  // on menu close
  handleOnClose() {
    this.setState({
      showMenu: false
    })
  }

  // calculates total price
  getTotal(array) {
    let total = this.state.totalPrice
    array.forEach( item => {
      total += item.price;
    })
    this.setState({
        totalPrice: total
    })
  }

  render() {
    let currencies = this.state.currencies;
      return (
        <div id = "main">
          {/* side menu displays cart */}
          <Menu width={ '30%' } onClose={ this.handleOnClose } className = "menu-style" height = {'100%'} isOpen={ this.state.showMenu } pageWrapId={ "page-wrap" } outerContainerId={ "main"} right>
            <div className="bg-light menu-inner container-fluid p-3">
              <div className="row text-center mb-3">
                <div className="col ">
                  <button className="btn btn-sm float-left" onClick = {this.toggleMenu}>
                    <i className="fas fa-angle-right"></i>
                  </button>
                  <small className = "text-center">Your Cart</small>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <select onChange = {this.currencyChange}>
                    {currencies.map((currency, index) => {
                      return <option key = {index}>{currency}</option>;
                    })}
                  </select>
                </div>
              </div>
              {/* cart item */}
              { this.state.cart.length > 0 ? <Item getTotal = {this.getTotal} Cart = {JSON.parse(JSON.stringify(this.state.cart))} parentCart = {this.state.cart} Products = {JSON.parse(JSON.stringify(this.state.products))} removeItem = {this.removeItem} addQtty = {this.addQtty} redQtty = {this.redQtty} totalPrice = {this.state.totalPrice} currency = {this.state.defaultCurrency} /> : <p className = "text-center">No items in cart</p> }
            </div>
            
            <footer className = "sticky-bottom bg-light px-4 py-3" style = {{borderTop: '1px solid #4b5548'}}>
              {/* <hr className = "w-100" style = {{background: "#4b5548"}} /> */}
              <div className="row">
                <div className="col">
                  <span className = "float-left">Subtotal</span>
                  <span className = "float-right">{this.state.defaultCurrency}{this.state.totalPrice}</span>
                </div>
                <div className="col-12 text-uppercase bg-white text-center">
                  <button className = "btn btn-block text-uppercase bg-white mb-2" style = {{border: '1px solid #4b5548', borderRadius: '0'}}><small>Make this a Subscription (Save 20%)</small></button>
                  <button className="btn btn-block text-white" style = {{background: "#4b5548", borderRadius: '0'}}>PROCEED TO CHECKOUT</button>
                </div>
              </div>
            </footer>
          </Menu>
          <Header cart = {this.state.cart} toggleMenu = {this.toggleMenu} />
          <div className="page-wrap">
            <Products products = {this.state.products} productsCopy = {JSON.parse(JSON.stringify(this.state.products))} currency = {this.state.defaultCurrency} addToCart = {this.addToCart} cart = {this.state.cart} />
          </div>
        </div>
      )
    
  }
}

export default App
