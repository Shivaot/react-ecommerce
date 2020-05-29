import React from 'react';

import classes from './ProductList.module.css';
import { withRouter } from 'react-router-dom';

const ProductCard = (props) => {
    let nameClass = [classes.center,"badge badge-warning text-wrap"]
    console.log(props);
    
    return (
		<div className="col-xs-12 col-sm-4">
			<img src={`http://${props.image.toString()}`} alt="something" className={classes.boxsize} />
				<p className={nameClass.join(" ")} style={{fontWeight: "bold",width:"6rem"}}>{props.name}</p>
				<p className={classes.center} style={{fontWeight: "bold"}}>Rs {props.price[props.id]}</p>
				<button className={classes.mybtn} style={{ textAlign: "center" }} onClick={() => {props.history.push("/product/details/"+props.id)}}> Click To View </button>
		</div>
    );
};

export default withRouter(ProductCard);