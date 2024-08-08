import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Queries/Queries";
import NavBar from "./NavBar";

const Dashboard: React.FC = () => {
    const { data, loading, error} = useQuery(GET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <NavBar/>
            {data && data.user && (
                <div className="div">
                    <h2>User Details:</h2>
                    <p>Name: {data.user.name}</p>
                    <p>ID: {data.user.id}</p>
                    <p>Username: {data.user.username}</p>
                    <p>Phone: {data.user.phone}</p>
                    <p>Email: {data.user.email}</p>
                    <p>Website: {data.user.website}</p>
                    <p>Address: {data.user.address.street}, {data.user.address.city}</p>
                    {/* Add other fields if available */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
