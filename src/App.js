import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from './apiService';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',  // Only using a single 'name' field
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,  // Update the specific field based on 'name'
    });
  };

  const handleAddUser = async () => {
    const userData = {
      name: newUser.name,  // Use the name field for user creation
    };
    try {
      const createdUser = await createUser(userData);
      setUsers([...users, createdUser]);
      setNewUser({ name: '' });  // Reset after adding user
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} {/* Display the user's name */}
          </li>
        ))}
      </ul>

      <h2>Add New User</h2>
      <input
        type="text"
        name="name"  // Single input for 'name'
        value={newUser.name}
        placeholder="User Name"
        onChange={handleInputChange}
      />
      
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

export default App;
