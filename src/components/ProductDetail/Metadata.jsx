import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const Metadata = ({ fields,primaryValues,secondaryValues ,name,price,image,id,...props}) => {
    const [primarySelect,setPrimarySelect] = useState(null);
    const [secondarySelect,setSecondarySelect] = useState(null);
    const [disabled,setDisabled] = useState(true);

    const primarySelectChangeHandler = (e) => {
        setPrimarySelect(e.target.value)     
        setDisabled(false);  
    }
    const secondarySelectChangeHandler = (e) => {
        setSecondarySelect(e.target.value);
        setDisabled(false);     
    }
    const cartHandler = () => {
        console.log(primarySelect,secondarySelect);
        console.log(name,price,primaryImage);
        setDisabled(true);
        props.onCartIncrement();
        props.onAddToCart(name,price,primaryImage[0],id,1);
    }


    let transformedImages = image.reduce(function(a, e, i) {
        if (e.includes(id))
            a.push(e);
        return a;
    }, []); 
    let primaryImage = transformedImages.filter((arr,i) => i===0).map(image => image); 

    
    
    return (
     <>
          {
          <div className="row mt-4">
          <h4>{fields[0]}: &nbsp; &nbsp;</h4>

            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" style={{width: "30%"}} onChange={primarySelectChangeHandler} defaultValue={'Choose'}>
                <option defaultValue={"Choose"}>Choose</option>
                {Array.from(new Set(primaryValues)).map((pm,i) => (
                        <option  key={i} value={pm} >{pm}</option>
                ))}
            </select>
          </div>
          }
          {
          <div className="row mt-4">
          <h4>{fields[1]}: &nbsp; &nbsp;</h4>
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" style={{width: "30%"}} onChange={secondarySelectChangeHandler} defaultValue={'Choose'}>
                <option  defaultValue={"Choose"}>Choose</option>
                {Array.from(new Set(secondaryValues)).map((pm,i) => (
                        <option  key={i} value={pm} >{pm}</option>
                    ))}
            </select>
          </div>
          }
          <button className="btn btn-primary" style={{marginRight: "40%",marginTop: "10%"}} onClick={cartHandler} disabled={disabled}><i className="fa fa-cart-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Add to Cart</button>
     </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCartIncrement: () => dispatch(actions.cartIncrement(1)),
        onAddToCart: (name,price,image,id,qty) => dispatch(actions.addToCart(name,price,image,id,qty))
    }
}

export default connect(null,mapDispatchToProps)(Metadata);