import React, { useState, useEffect } from 'react';
import './Task2.css';

const Task2 = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // We use an artificial delay to clearly display the loading spinner
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching the data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to simulate a failed request
    const triggerError = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            setIsLoading(false);
            setError("Failed to fetch data: Simulated Network Error");
            setData([]);
        }, 1000);
    };

    return (
        <div className="task2-container">
            <h2>API Loading & Error Handling Demo</h2>
            
            <div className="controls">
                <button onClick={() => window.location.reload()} className="btn btn-primary">
                    Reload Data
                </button>
                <button onClick={triggerError} className="btn btn-danger">
                    Simulate Error
                </button>
            </div>

            {/* Display Loading Spinner */}
            {isLoading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading data...</p>
                </div>
            )}

            {/* Display Error Message */}
            {error && !isLoading && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            )}

            {/* Display Fetched Data */}
            {!isLoading && !error && data.length > 0 && (
                <div className="data-list">
                    {data.map(item => (
                        <div key={item.id} className="data-card">
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Task2;