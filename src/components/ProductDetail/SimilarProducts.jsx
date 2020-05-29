import React, { useEffect , useState} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import * as actions from '../../store/actions/index';

const SimilarProducts = ({ id, token, history,...props }) => {
    const [products,setProducts]  = useState([]);
    const [images,setImages] = useState([]);
    useEffect(() => {
        const headers = {
			Authorization: 'Bearer' + token
        }
        axios.get('product/customer/similar/' + id,{ headers: headers})
            .then(response => {
                console.log(response.data);
                setProducts(response.data.products);
                setImages(response.data.images);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    },[id,token])

    const viewProductHandler = id => {
        history.push("/product/details/"+id);
        props.onFetchProductDetail(token,id);
    }

    return (
        <div className="container">
        <div className="row mt-5">
             <h2>Similar Products</h2>
        </div>
        
        <div className="row mt-5">
            {products.filter((el,i) => i < 4).map(product => (
                <div key={product.id} className="col-md-3" >
                    <div className="card">
                        <img className="card-img-top img-fluid" style={{maxHeight: "160px"}} src={"http://"+images[images.findIndex(el => el.includes(product.id))]} alt="some"/>
                        <div className="card-title" >
                            <h4>{product.name}</h4>
                        </div> 
                        <div className="card-text">
                            {product.description}<br /><br />
                            <button className="btn btn-danger text-light" onClick={() => viewProductHandler(product.id)}>View</button><br /><br />
                        </div>
                    </div>
            </div> 
            ))}
        </div>
        
        
     </div>
     
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProductDetail: (token,id) => dispatch(actions.fetchProductDetail(token,id))
    }
}

export default connect(null,mapDispatchToProps)(SimilarProducts);