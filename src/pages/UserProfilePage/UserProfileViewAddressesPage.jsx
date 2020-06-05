import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import Modal from '../../components/UI/Modal/Modal';
import AddressUpdate from './AddressUpdate';

const UserProfileViewAddresses = ({ token }) => {
    const [addresses,setAddresses] = useState([]);
    const [updateId,setUpdateId] = useState("");
    const [deleted,setDeleted] = useState(false);
    const [showModal,setShowModal] = useState(false);

    useEffect(() => {
      const headers = {
        Authorization: 'Bearer' + token
      }
      axios.get('/customer/profile/addresses',{ headers: headers })
        .then(response => {
          console.log(response.data);
          setAddresses(response.data);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
          }
        })
    },[token,deleted,showModal]) 

    const updateClick = (id) => {
      setUpdateId(id);   
      setShowModal(true);
    }

    const modalClosedHandler = () => setShowModal(false);

    const deleteClick = (id) => {
      setDeleted(false);
      const headers = {
			  Authorization: "Bearer" + token,
      };
        axios.delete('customer/profile/address/' + id,{ headers: headers })
            .then(response => {
                setDeleted(true);
                // console.log(response);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }

    if (addresses.length === 0) {
      return <h3>No addresses Found</h3>;
    }
    return (
        <div className="container" style={{marginTop: "5%"}}> 
        <div className="row flex-lg-nowrap">
        
          <div className="col">
            <div className="row">
              <div className="col mb-3" style={{width: "50%"}}>
                <div className="card" >
                  <div className="card-body" style={{marginRight: "-20%"}}>
                   {showModal ? <Modal show={showModal} modalClosed={modalClosedHandler}>
                      <AddressUpdate id={updateId} token={token} />
                    </Modal> : null}
                  <table className="table table-hover table-responsive-sm" style={{width: "70%",marginLeft:"5%"}}>
                      <thead className="thead-dark">
                          <tr>
                          <th scope="col">#</th>
                          <th scope="col">Country</th>
                          <th scope="col">State</th>
                          <th scope="col">City</th>
                          <th scope="col">Zip Code</th>
                          <th scope="col">Full Address</th>
                          <th scope="col">Label</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                          </tr>
                      </thead>
                      <tbody>
                          {addresses.map((address,index) => (
                            <tr key={address.id}>
                            <th scope="row">{index}</th>
                            <td>{address.country}</td>
                            <td>{address.state}</td>
                            <td>{address.city}</td>
                            <td>{address.zipCode}</td>
                            <td>{address.address}</td>
                            <td>{address.label}</td>
                            <td><button type="submit" className="btn btn-primary" onClick={() => updateClick(address.id)}>Update</button></td>
                            <td><button type="submit" className="btn btn-danger" onClick={() => deleteClick(address.id)}>Delete</button></td>
                        </tr>
                          ))}
                        
                      </tbody>
                  </table>
                  </div>
                </div>
              </div>
        
            </div>
        
          </div>
        </div>
        </div>
    );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(UserProfileViewAddresses);