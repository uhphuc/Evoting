import { useAuth } from "../context/useAuth";
import React, { useState } from 'react';
import SideBar from "../components/sidebar";

const HomePage = () => {
    const { user } = useAuth();
    
    return (
        <div className="flex flex-col h-screen">
            <SideBar admin={user} />
        </div>
    );
}
export default HomePage;