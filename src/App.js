import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from './apiService';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    joinedAt: '',
    isActive: true,
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
    const { name, value, type, checked } = e.target;
    setNewUser({
      ...newUser,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddUser = async () => {
    const userData = {
      ...newUser,
      joinedAt: new Date(newUser.joinedAt).toISOString(),
    };
    try {
      const createdUser = await createUser(userData);
      setUsers([...users, createdUser]);
      setNewUser({ firstName: '', lastName: '', joinedAt: '', isActive: true });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.firstName} {user.lastName}</li>
        ))}
      </ul>
      
      <h2>Add New User</h2>
      <input
        type="text"
        name="firstName"
        value={newUser.firstName}
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        value={newUser.lastName}
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="joinedAt"
        value={newUser.joinedAt}
        onChange={handleInputChange}
      />
      <label>
        Active:
        <input
          type="checkbox"
          name="isActive"
          checked={newUser.isActive}
          onChange={handleInputChange}
        />
      </label>
      
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

export default App;
