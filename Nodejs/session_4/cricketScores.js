// Generate a beginner-friendly Node.js function that fetches cricket match scores from a mock API using Promises. Simulate the API delay with setTimeout. The code should handle successful responses, failed requests, empty score data, and print a completion message.

const fetchCricketScores = () => {
    console.log("Fetching cricket scores...");

    // Simulate a mock API call with setTimeout
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different scenarios
            const success = Math.random() > 0.2; // 80% chance of success
            const scores = Math.random() > 0.5 ? ["Team A: 250/8", "Team B: 200/10"] : []; // 50% chance of empty data

            if (success) {
                if (scores.length > 0) {
                    resolve(scores);
                } else {
                    reject(new Error("No scores available."));
                }
            } else {
                reject(new Error("Failed to fetch scores."));
            }
        }, 2000); // Simulate 2 seconds delay
    });
};

// Call the function and handle the promise
fetchCricketScores()
    .then((scores) => {
        console.log("Cricket Scores:");
        scores.forEach((score) => console.log(score));
    })
    .catch((error) => {
        console.error("Error:", error.message);
    })
    .finally(() => {
        console.log("Fetching process completed.");
    });