import React, { Component } from 'react';
// import { useEffect, useState } from 'react';

export class Item extends Component {
    state = {
        items: this.props.Cart,
        products: this.props.Products
    }

    componentDidMount() {
        this.addQtty = this.addQtty.bind(this);
        this.redQtty = this.redQtty.bind(this);
        console.log(this.state.products)
        console.log(this.state.items)
    }

    addQtty(item, index) {
        this.props.redQtty(item);
    }

    redQtty(item, index) {
        this.props.redQtty(item);
    }
    render() {
        // if(this.props.Cart) {
            return (
                this.state.items.map((item, index) => (
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
                                    <p>${this.state.items[index].price}</p>
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
