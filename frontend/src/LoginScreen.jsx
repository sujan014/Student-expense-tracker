import axios from "axios";
import { useEffect, useState } from "react";

const LoginScreen = ({handleUserId}) => {
    const [students, setStudents]  = useState([]);
    const [page, setPage] = useState(0);
    const [upStop, setUpStop] = useState(false);

    const getStudents = async () => {
        try{
            var response = await axios.get(`http://localhost:3000/students?page=${page}`);
            console.log(response);
            if (response.status === 200){                
                //console.log(response.data.data);
                if (response.data.data.length){
                    setStudents(response.data.data);
                }
                if (response.data.data.length < 4){
                    setUpStop(true);
                } else{
                    setUpStop(false);
                }
            } else {
                alert(`Error status: ${response.status}`);
            }
        }
        catch (error){
            console.log(error);
        }
    }
    useEffect(() => {
        getStudents();
    }, [page]);

    const handleLoginClick = (event, Id) => {
        event.preventDefault();                
        var selStud = students.find(({_id}) => _id === Id);        
        console.log(selStud);
        if (selStud){
            handleUserId(Id);
        }
    }
    const handlePageChange = (event, state) => {
        event.preventDefault();
        if (state){
            if (!upStop){
                setPage(page => page + 1);
            }
        }
        else{
            if(page > 0)
            {
                setPage(page => page - 1)
            }
        }
    }

    return (
        <div className="login">
            <div className="login-row">
                Click on the User Name button to login as that user
            </div>

            {students.map(student => (
                <button 
                    className="login-button"
                    onClick={(event) => handleLoginClick(event, student._id)}
                >
                    {student.name}                    
                </button>
            ))}

            <div className="login-row">
                <button 
                    className="nav-button"
                    onClick={(event) => handlePageChange(event, false)}
                >
                    &lt;&lt;
                </button>
                <button 
                    className="nav-button"
                    onClick={(event) => handlePageChange(event, true)}
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    )
}

export default LoginScreen

{/* <div className="login-row">
                <button 
                    className="login-button"
                    onClick={(event) => handleLoginClick(event, 1)}
                >
                    Harry Scriptor
                </button>
            </div>
            <div className="login-row">
                <button 
                    className="login-button"
                    onClick={(event) => handleLoginClick(event, 2)}
                >
                    Java Scriptson
                </button>
            </div>
            <div className="login-row">
                <button 
                    className="login-button"
                    onClick={(event) => handleLoginClick(event, 3)}
                >
                    CSSandra Styles
                </button>
            </div>
            <div className="login-row">
                <button 
                    className="login-button"
                    onClick={(event) => handleLoginClick(event, 4)}
                >
                    Reacto Nator
                </button>
            </div> */}