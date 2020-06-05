import React, { Component } from "react";
import { connect } from 'react-redux';

import Image from "../../components/ProductDetail/Image";
import "./ProductDetailPage.css";
import Info from "../../components/ProductDetail/Info";
import Metadata from "../../components/ProductDetail/Metadata";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import SimilarProducts from "../../components/ProductDetail/SimilarProducts";

class ProductDetailPage extends Component {
    componentDidMount() {
        this.props.onFetchProductDetail(this.props.token,this.props.match.params.id);   
	}
	render() {
        let finalFields = [];
		let propertyNames = [];
        let propertyValues = [];
        // console.log(this.props.variations);
		this.props.variations.map((vr) => {
			return Object.keys(vr.metadata).map((key, i) => {
				propertyNames.push(key);
				propertyValues.push(vr.metadata[key][0]);
				return 0;
			});
		});
		let fieldSet = new Set(propertyNames);
		finalFields = [];
		fieldSet.forEach((el) => finalFields.push(el));
		let primaryValues = [];
		let secondaryValues = [];
		for (let i = 0; i < propertyValues.length; i++) {
			if (i % 2 === 0) {
				primaryValues.push(propertyValues[i]);
			} else {
				secondaryValues.push(propertyValues[i]);
			}
        }

        if (this.props.loading) {
            return <Spinner />;
        }
		return (
			<div className="container" style={{ paddingBottom: "10%" }}>
				<div className="row">
					<Image images={this.props.images} id={this.props.match.params.id}/>
					<div className="col-md-6">
						<Info product={this.props.product} price={this.props.price} />
						<Metadata fields={finalFields} primaryValues={primaryValues} secondaryValues={secondaryValues} image={this.props.images} name={this.props.product.name} price={this.props.price} id={this.props.match.params.id}/>
					</div>
				</div>
				<SimilarProducts id={this.props.match.params.id} token={this.props.token} history={this.props.history} />
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.productDetail.loading,
        product: state.productDetail.product,
        variations: state.productDetail.variations,
        images: state.productDetail.images,
        price: state.productDetail.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProductDetail : (token,productId) =>  dispatch(actions.fetchProductDetail(token,productId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailPage);
