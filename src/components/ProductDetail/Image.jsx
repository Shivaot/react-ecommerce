import React from 'react';

const Image = ({ images, id }) => {
    let transformedImages = images.reduce(function(a, e, i) {
        if (e.includes(id))
            a.push(e);
        return a;
    }, []); 
    let primaryContent = transformedImages.filter((arr,i) => i===0).map(image => (
        <div key={"1"} className="carousel-item active"> <img className="d-block w-100" src={"http://"+image} alt={`First slide}`} /> </div>
    )) 
    let content = transformedImages.map((image,index) => (
        <div key={index} className="carousel-item"> <img className="d-block w-100" src={"http://"+image} alt={`${index} slide}`} /> </div>
    ));

    return (
      <div className="col-md-6" style={{paddingRight: "10%",paddingTop: "10%"}}>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {primaryContent}
            {content}
          </div>
           <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> 
        </div>
      </div>
    );
};

export default Image;