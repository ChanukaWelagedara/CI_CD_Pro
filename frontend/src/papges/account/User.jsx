import React, { useState } from "react";

function User(){
    const[user,setuser]=useState([{
            Name: "Chanu",
            Email:"chanu@gmail",
            Number:"0987654321"

    }])
    return(
        <di className="class 01">
            <div className="Clas02">
                <table className="table01">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user)=>{
                                <tr>
                                    <td>{user.Name}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Number}</td>
                                    <td><button>Edit</button><button>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div> 
            
        </di>
    )
}
export default User;