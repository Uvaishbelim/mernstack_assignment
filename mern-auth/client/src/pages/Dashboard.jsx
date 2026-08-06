import { useEffect, useState } from "react";
import authService from "../services/authService";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const res = await authService.getProfile();

                setUser(res.data.user);

            }

            catch (error) {

                console.log(error);

            }

        };

        loadProfile();

    }, []);

    return (

        <div>

            <h1>

                Dashboard

            </h1>

            {

                user && (

                    <>
                        <h3>{user.name}</h3>

                        <h3>{user.email}</h3>
                    </>

                )

            }

        </div>

    );

}

export default Dashboard;