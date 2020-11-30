import React, { Component } from 'react';
// import { useEffect, useState } from 'react';

export class Item extends Component {
    state = {
        items: this.props.Cart,
        parentItems: this.props.parentCart,
        products: this.props.Products,
        totalPrice: this.props.totalPrice
    }

    componentDidMount() {
        this.addQtty = this.addQtty.bind(this);
        this.redQtty = this.redQtty.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getTotal = this.getTotal.bind(this);
        console.log(this.state.products)
        console.log(this.state.items)
    }

    // increase quantity
    addQtty(item, index) {
        // this.props.addQtty(item);
        let items = this.state.parentItems;
        let itemIndx = this.state.parentItems.indexOf(item);

        let initProd;
        this.state.products.forEach((product, indx) => {
            if(product.id === item.id) {
                initProd = product;
            }
        });
        // console.log(prodIndx);
        console.log(itemIndx);
        console.log(index);
        console.log(initProd);
        console.log(item);
        items[itemIndx].quantity++;
        items[itemIndx].price = items[itemIndx].quantity * initProd.price;
        this.setState({
            parentItems: items
        })

        this.getTotal(this.props.parentCart)
    }

    redQtty(item, index) {
        // this.props.redQtty(item);
        if(item.quantity === 1) {
            this.props.removeItem(item);
            // alert("Zero")
          }
          else {
            let items = this.state.parentItems;
            let itemIndx = this.state.parentItems.indexOf(item);
            let initProd;
            // matching the selected item to the original product as a reference for initial information
            this.state.products.forEach((product, indx) => {
                if(product.id === item.id) {
                    initProd = product;
                }
            });
            items[itemIndx].quantity > 0? items[itemIndx].quantity-- : items[itemIndx].quantity = 0;
            items[itemIndx].price = items[itemIndx].price - initProd.price;
            this.setState({
                parentItems: items
            })
          }

          this.getTotal(this.props.parentCart)
 
    }

    // removes item from cart
    removeItem(item) {
        console.log(item)
        let items = this.state.parentItems;
        items = items.filter((obj) => {
        return obj !== item
        })
        this.setState({
            parentItems: items
        })
        this.getTotal(this.props.parentCart);
    }

    getTotal(array) {
        this.props.getTotal(array);
    }

    render() {
        // if(this.props.Cart) {
            return (
                this.props.parentCart.map((item, index) => (
                    <div className="row bg-white mb-3" key = {item.id}>
                        <div className="col-8 p-2">
                            <small>{item.title}</small> <br/>
                            {/* <button className="btn text-white" onClick = { ()=> this.props.removeItem(item)}>Add to Cart</button> */}
                            <div className = "mt-3">
                                <span className = "float-left" style = {qty}>
                                    <button className="btn bg-white btn-sm d-inline m-1" onClick = {()=> this.redQtty(item, index)}>-</button>
                                        {item.quantity}
                                    <button className="btn bg-white btn-sm d-inline m-1" onClick = {()=> this.addQtty(item, index)}>+</button>
                                </span>
                                <span className = "float-right">
                                    <p>{this.props.currency}{item.price}</p>
                                </span>
                            </div>
                        </div>
                        <div className="col-4 p-2 text-center" style = {{background: "#d4d4d4"}}>
                            <button className="btn btn-sm float-right p-0" style = {{background: "transparent"}} onClick = {()=> this.props.removeItem(item)}> <i className="fas fa-times"></i> </button> <br/>
                            <img className = "img-center text-center" src={item.image_url} alt="item_img" style = {imgStyle} />
                        </div>
                    </div>
    
                )
            )
            )
        // }

        // return (
        //     <div>
        //         <p>Add items to cart</p>
        //     </div>
        // )

    }
}

const imgStyle = {
    height: "30px",
    width: "30px"
}

const qty = {
    border: "1px solid grey"
}

export default Item
