import React, { Component } from 'react';
import PropTypes from 'prop-types'

export class Productitem extends Component {
    
    state = {
        products: this.props.products,
        parentItems: this.props.parentCart
    }
    componentDidMount() {
        console.log(this.props.products)
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(item, index) {
        console.log(item);
        this.props.addToCart(item, index);
    }
    render() {
        if(this.props.products) {
            console.log(this.props.products)
            // const prods = this.props.products;
            return( 
                    this.props.products.map((product, index) => (
                        <div className="col-6 col-md-4 text-center pt-5 mb-3" key = {product.id} style = {colStyle}>
                            <img className = "product-img" src={product.image_url} alt="product-img" style = {imgStyle}/> <br/>
                            <p>{product.title}</p>
                            <p>From {this.props.currency} {product.price}</p>
                            <button className="btn text-white" style = {buttonStyle} onClick = { ()=> this.addToCart(product)}>Add to Cart</button>
                        </div>
                    )
                )
            )
        }
        return (
            
            <div className = "col text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )

    }
}

    Productitem.propTypes = {
        products: PropTypes.array.isRequired
    }

    // custom styling for images
    const imgStyle = {
        width: '100px',
        height: '100px',
        marginBottom: "50px",
        marginTop: "50px"
    }

    // custom styling for columns
    const colStyle = {
        // height: '300px'
    }

    // custom styling for buttons
    const buttonStyle = {
        background: "#4b5548", 
        borderRadius: "0",
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "pointer",
        zIndex: "1000"
    }


export default Productitem
