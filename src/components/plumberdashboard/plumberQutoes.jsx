import React,{useEffect, useState } from "react";
import Dashnavbar from "./plumbernavbar";
import Sidebar from "./plumbersidebar";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

function Quotes()
{
    const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/get-plumber-quotes";
    const [qutoesdata, setQutoes] = useState([]); 

    var token = localStorage.getItem('accessToken');
    const qutoes= async() => {
      try{
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const response = await axios.get(apiurl,{headers});
        if(response.status===200){
            console.log(response.data.data);
            setQutoes(response.data.data); 
        }
      }catch(error){
          console.log(error);
      }
    }
  
    useEffect(() =>{
        qutoes();
    },[])

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return(
        <>   
        <Dashnavbar />
        <div className="container-fluid" style={{ backgroundColor: "rgb(248, 248, 248)", width: "100%", height: "100vh" }}>
          <div className="row dash_row">
            <div className="col-3 col_corr_2">
              <Sidebar activelink={isPlumbersLinkActive} />
            </div>
            <div className="col-9 col_corr_1">
              <div className="dashmain">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Plumbing Issue</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {qutoesdata.map((data, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{data.customerName}</td>
                            <td>{data.jobTitle}</td>
                            <td>{data.price}</td>
                            <td>{data.description}</td>
                            <td><button className="btn btn-success">Send Notify</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
export default Quotes 