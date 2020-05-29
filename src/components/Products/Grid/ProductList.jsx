import React, { useCallback } from "react";
import { connect } from 'react-redux';

import classes from "./ProductList.module.css";
import ProductCard from "./ProductCard";
import * as actions from '../../../store/actions/index';

const ProductList = (props) => {
    var categoryNameTillRoot = [];
    const  getCategoryNameTillRoot = useCallback((category) => {
        categoryNameTillRoot.push(category.name);
        while (category.parentId != null) {
            category = category.parentId;
            categoryNameTillRoot.push(category.name);
        }
        return categoryNameTillRoot;
    },[categoryNameTillRoot]);

    if (props.category) {
        console.log(props.category.category);
        getCategoryNameTillRoot(props.category.category);
    }
	
	const orderByHandler = (e) => {
		console.log(e.target.value);
		props.onFetchProducts(props.token,props.id,e.target.value);
	}
    
    let classesQty = [classes.left,"text-muted"];
	return (
		<>
			<div className="row">
				<div className="col-xs-12 col-sm-6">
					<span className={classesQty.join(" ")} ><span className="badge badge-success text-wrap" style={{fontSize: "1rem",marginRight: "30px"}}>{categoryNameTillRoot.reverse().join("➜")}</span>{props.products.length} Product(s) Found</span>
				</div>

				<div className="col-xs-12 col-sm-6">
					<span className={classes.right}>
						Orderby
						<select name="" onChange={orderByHandler}>
							<option value="">Select</option>
							<option value="asc">Name A-Z</option>
							<option value="desc">Name Z-A</option>
						</select>
					</span>
				</div>
			</div>
            <div className="row">
                {props.products.map(product => (
                    <ProductCard id={product.id} key={product.id} name={product.name} desc={product.description} image={props.images[props.images.findIndex(el => el.includes(product.id))]} 
                        price={props.prices.find(e => e[product.id])}
                    />
                ))}
            </div>

		</>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchProducts: (token,categoryId,sortBy) => dispatch(actions.fetchProducts(token,categoryId,sortBy))
	}
}

export default connect(null,mapDispatchToProps)(ProductList);


