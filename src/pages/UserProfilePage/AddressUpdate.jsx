import React,{ useState}from 'react';
import axios from '../../axios';

const AddressUpdate = ({ id , token}) => {
    const [country,setCountry] = useState("");
    const [state,setState] = useState("");
    const [city,setCity] = useState("");
    const [zipCode,setZipCode] = useState("");
    const [address,setAddress] = useState("");
    const [label,setLabel] = useState("");
    const [success,setSuccess] = useState(false);

    const countryChangeHandler = (e) => setCountry(e.target.value);
    const stateChangeHandler = (e) => setState(e.target.value);
    const cityChangeHandler = (e) => setCity(e.target.value);
    const zipCodeChangeHandler = (e) => setZipCode(e.target.value);
    const addressChangeHandler = (e) => setAddress(e.target.value);
    const labelChangeHandler = (e) => setLabel(e.target.value);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setSuccess(false);
        const postData = {
            "state":state,
            "city":city,
            "zipCode":zipCode,
            "address":address,
            "country":country,
            "label":label  
        }
        const headers = {
			Authorization: 'Bearer' + token
        }
        axios.put('/customer/profile/updateAddress/'+id,postData,{headers: headers })
            .then(response => {
                console.log(response.data);
                setSuccess(true);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data)
                }
            })
        setCountry("");
        setState("")
        setCity("");
        setZipCode("");
        setAddress("");
        setLabel("");
    }

    if (success) {
        return <p>Address Updated</p>
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="form-group row">
                <input className="form-control"  type="text" value={country} onChange={countryChangeHandler} placeholder="Country" required style={{marginLeft: "22%"}}/>
            </div>
            <div className="form-group row">
                <input className="form-control"  type="text" value={state} onChange={stateChangeHandler} placeholder="State" required style={{marginLeft: "22%"}}/>
             </div>
             <div className="form-group row">
                <input className="form-control"  type="text" value={city} onChange={cityChangeHandler} placeholder="City" required style={{marginLeft: "22%"}}/>
              </div>
            <div className="form-group row">
                <input className="form-control"  type="text" value={zipCode} onChange={zipCodeChangeHandler} placeholder="Zip Code" required style={{marginLeft: "22%"}}/>
            </div>
            <div className="form-group row">
                <input className="form-control"  type="text" value={address} onChange={addressChangeHandler} placeholder="Full Address" required style={{marginLeft: "22%"}}/>
            </div>
            <div className="form-group row">
                <input className="form-control"  type="text" value={label} onChange={labelChangeHandler} placeholder="Label" required style={{marginLeft: "22%"}}/>
            </div>           
            <div className="form-group row">
                <div className="col-lg-9">
                    <button type="Submit" className="btn btn-primary" style={{marginLeft:"-10%"}}>Submit</button>
                </div>
            </div>
        </form>
    );
};

export default AddressUpdate;