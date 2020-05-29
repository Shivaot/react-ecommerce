import React from 'react';

const Info = ({ product, price }) => {
    return (
       <>
            <div className="row">
                <h2>{product.brand + " " + product.name}</h2>
            </div>
            <div className="row">
                <h1>{}<i className="fa fa-inr" aria-hidden="true"></i>Rs {price}</h1>
                &nbsp; &nbsp;
                <h3><del>5550</del></h3>
                &nbsp; &nbsp;
                <h2 className="text-success">30% off</h2>
            </div>
            <div className="row">
                <h3 className="text-warning"><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-half-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></h3>
                &nbsp; &nbsp;
                <h5>1200 star rating  and 250 reviews</h5>
            </div>
            <div className="row mt-4">
                <h3 className="text-info">{}<i className="fa fa-map-marker" aria-hidden="true"></i></h3>
                <p style={{fontSize: "20px"}}> &nbsp; Delivery by 23 Jul, Tuesday | &nbsp; <span className="text-success">FREE</span> </p>
            </div>
            <div className="row">
                <p>{product.description}</p>
            </div>
       </>
    );
};

export default Info;