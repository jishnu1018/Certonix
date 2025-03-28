import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Nav = () => {
    const navigate = useNavigate()

    // Logout function
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "GET",
                credentials: "include",
            })

            if (response.ok) {
                alert("Logged out successfully!")
                navigate("/login") 
            } 
            else {
                console.error("Logout failed")
            }
        } 
        
        catch (error) {
            console.error("Error during logout:", error)
        }
    }

    return (
     
            <div className="flex justify-end gap-7 mr-[10px] text-3xl text-purple-950 pt-[20px]">
                    <Link to={'/home'} className="mt-1 mr-1 hover:bg-blue-400">Home</Link>
                    <Link to={'/issue'} className="mt-1 mr-1 hover:bg-blue-400">Issue Certificate</Link>
                    <button  onClick={handleLogout} className="mt-1 mr-1 hover:bg-blue-400">Logout</button>
                </div>


    )
}

export default Nav