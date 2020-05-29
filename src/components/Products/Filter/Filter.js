import React, { useEffect, useState } from 'react';
import axios from '../../../axios';

import classes from './Filter.module.css';

const Filter = ({ catId, token ,products}) => {
    const [brands,setBrands] = useState([]);
    const [fieldValuesSet, setFieldValuesSet] = useState([]);

    useEffect(() => {
        if (catId) {
            axios.get(`customer/profile/filterCategories/${catId}`,{ headers: {Authorization: "Bearer" + token}})
            .then(response => {
                setBrands(response.data[0].brands)
                setFieldValuesSet(response.data[0].filedValuesSet);
            })
            .catch(error => {
                console.log(error.response.data);
            })
        }   
    },[catId,token])


    if (products.length === 0) {
        return null;
    }

    var content = [];
    var array = [];
    fieldValuesSet.map(el => (
        Object.keys(el).map((item,index) => {
            array = el[item].split(",")
            content.push(
                <div key={Math.random()}>
                        <h4><u>{item}</u></h4>
                        <ul className={classes.algn} >
                            {array.map((arr,i) => (  
                            <li key={Math.random()}>
                              <input type="checkbox" id={index} style={{float: "left",marginTop: "6px",marginLeft: "35px"}} /><span style={{bottom: "5px"}}>{arr}</span>
                            </li>
                            ))}
                        </ul>
                  </div>
            )
            return 0;
        })
    ))

    return (
      <div className="card" style={{width: "150%"}}>
            <div className="card-body">
                    <h2><u>FILTERS</u></h2>
                    {content}
    				<h4 className={classes.headingmargin}><u>BRANDS</u></h4>
        			<ul>
                            {brands.map((brand,index) => (
                                <li key={index} >
                                    <input type="checkbox" id={index} style={{float: "left",marginTop: "6px",marginLeft: "35px"}} />
                                    <span style={{textAlign: "left"}}>{brand}</span>
                                </li>
                            ))}
                    </ul>
            </div>
      </div>
			
        
    );
};

export default Filter;