import React, { useState,useEffect } from 'react';
import firebase from '../config/fire';

function Orders() {
  const [orders,setOrders]=useState([]);
  useEffect(() => {
    const fetchData = async () =>{
      const db = firebase.firestore()
      const data= await db.collection("liveOnlineOrders").get()
      setOrders(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    fetchData()
  }, [])

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <table className="table table-borderless table-stripped">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Total Price</th>
                    <th>Vendor</th>
                    <th>Location</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=>(
                    <tr key={order.id}>
                            <td>{order.user.name}</td>
                            <td>Rs.{order.totalCost}</td>
                            <td>{order.vendors}</td>
                            <td>{order.physicalLocation}</td>
                            <td>
                                <a className="btn text-primary" >
                                    <i className="fas fa-pencil-alt"/>
                                </a>
                            </td>
                        </tr>
                         
                  ))}
            </tbody>
        </table>
      </div>
     
    </div>
  );
}

export default Orders;

