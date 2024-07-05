import React, { useState } from "react";

function UpdateUser() {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submission of updated user data here
    console.log("Updated user data:", user);
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={user.Name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="Email"
            value={user.Email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Number:</label>
          <input
            type="text"
            name="Number"
            value={user.Number}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
