import { useEffect, useState } from "react"
import { index } from '../services/user'
import almondCrossiant from '../assets/almond-crossiant.png'

const Dashboard = (props) => {

    // const [allUsers, setAllUsers] = useState([])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const usersData =  await index()
    //         setAllUsers(usersData)
    //     }
    //     fetchUsers()
        
    // }, [])

    return (
        <div className="home-page">
            <header>
                <center><h1>Welcome {props.user.username}!</h1></center>
                {/* <h2>View All the Users</h2> */}
            </header>
           <div className="name-container">
            <h1>Bake 
                <br/>
                & Cup
            </h1>

           </div>
        </div>
    )
}

export default Dashboard