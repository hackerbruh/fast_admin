import React, { useState,useEffect } from 'react';
import firebase from '../config/fire';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,Link
} from "react-router-dom";
function Vendors() {
  const [vendors,setVendors]=useState([]);
  useEffect(() => {
    const fetchData = async () =>{
      const db = firebase.firestore()
      const data= await db.collection("vendors").get()
      setVendors(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    fetchData()
  }, [])

  return (
    <div className="row">
         <table className="table table-borderless ">
            <thead className="thead-dark">
                <tr>
            <th><Typography variant="h4">
                Vendors       
              </Typography></th>
                    <th></th>
                    <th><Link to="/newvendor" >
               <button className="btn btn-primary">Add New</button>
               </Link></th>
                </tr>
            </thead>
        </table>
      <div className="col-md-8 offset-md-2">
        <table className="table table-borderless table-stripped">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Min Order</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Rating</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {vendors.map(vendor=>(
                    <tr key={vendor.id}>
                            <td>{vendor.name}</td>
                            <td>Rs.{vendor.minOrder}</td>
                            <td>{vendor.openTime}-{vendor.closeTime}</td>
                            <td>{vendor.physicalLocation}</td>
                            <td>{vendor.averageRating}</td>
                            <td>
                            <Link to={`/editvendor/${vendor.id}`}>
                            <a className="btn text-primary" >
                                    <i className="fas fa-pencil-alt"/>
                                </a>
                            </Link>
                            </td>
                        </tr>
                         
                  ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vendors;
