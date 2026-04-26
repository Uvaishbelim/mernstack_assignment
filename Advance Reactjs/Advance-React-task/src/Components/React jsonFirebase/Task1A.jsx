import React, { useState, useEffect } from 'react';
import './Task1a.css'; // Import CSS file (create this file separately)

const Task1a = () => {

    // State to store the users data
    const [users, setUsers] = useState([]);

    // State to track if data is still loading
    const [loading, setLoading] = useState(true);

    // State to handle errors
    const [error, setError] = useState(null);

    // This function runs when the component first loads
    useEffect(() => {
        // Function to fetch data from the API
        const fetchUsers = async () => {
            try {
                // Fetch data from the JSONPlaceholder API
                // JSONPlaceholder is a free fake API perfect for practice
                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Failed to fetch data from API');
                }

                // Convert the response to JSON format
                const data = await response.json();

                // Store the users data in our state
                setUsers(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                // If there's an error, store the error message
                console.error('Error fetching users:', err);
                setError(err.message || 'An error occurred while fetching data');
                setUsers([]); // Clear users on error
            } finally {
                // Set loading to false (whether it succeeded or failed)
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchUsers();
    }, []); // Empty array means this runs only once when component loads

    // Show loading message while fetching data
    if (loading) {
        return (
            <div className="container">
                <p className="loading">⏳ Loading users...</p>
            </div>
        );
    }

    // Show error message if something went wrong
    if (error) {
        return (
            <div className="container">
                <p className="error">❌ Error: {error}</p>
                <p style={{ textAlign: 'center', color: '#999', marginTop: '10px' }}>
                    Please check your internet connection and try again.
                </p>
            </div>
        );
    }

    // Show message if no users found
    if (users.length === 0) {
        return (
            <div className="container">
                <p className="loading">No users found</p>
            </div>
        );
    }


    return (
        <div className="container">
            <h1>👥 User Directory</h1>
            <p className="subtitle">Displaying {users.length} users from the API</p>

            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Loop through each user and create a table row */}
                    {users.map((user) => (
                        <tr key={user.id} className="user-row">
                            <td>{user.id}</td>
                            <td className="name-cell">{user.name}</td>
                            <td className="email-cell">{user.email}</td>
                            <td>{user.phone}</td>
                            <td className="website-cell">{user.website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Task1a