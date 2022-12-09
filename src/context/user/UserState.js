import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const [currentUser, setCurrentUser] = useState({
        email: "nahezsakharkar@gmail.com",
        password: "Pass@123",
        country: "India",
    });

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;