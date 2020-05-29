import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Filter from '../../components/Products/Filter/Filter';
import ProductList from '../../components/Products/Grid/ProductList';

const ProductPage = (props) => {
    const { token,onFetchProducts, match } = props;    

    useEffect(() => {
        onFetchProducts(token,match.params.id)
    },[token,onFetchProducts,match.params.id])
    let content = null;
    if (props.images.length === 0 || props.prices.length === 0) {
        content = null;
        return "";
    }
    content = props.error ? props.error : props.loading ? <Spinner /> : (
        <div className="container">
        <div className="row" style={{marginTop: "5%"}}> 
            <div className="col-xs-12 col-sm-3" style={{paddingRight: "12%",marginLeft: "-5%"}}>
                <Filter catId={match.params.id} token={props.token} products={props.products}/>
            </div>
            <div className="col-xs-12 col-sm-9" style={{marginLeft: "5%"}}>
                <ProductList products={props.products} images={props.images} prices={props.prices} category={props.products[0]} token={token} id={match.params.id}/>
            </div>
        </div>
   </div> 
    );
    
    return content;
};

const mapStateToProps = state => {
    return  {
        token: state.auth.token,
        products: state.products.products,
        images: state.products.images,
        prices: state.products.prices,
        loading: state.products.loading,
        error: state.products.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: (token,categoryId) => dispatch(actions.fetchProducts(token,categoryId))  
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductPage);