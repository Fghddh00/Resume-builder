import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import "./ViewFullResume.css";


function ViewFullResume(props) {

    const [resume, setResume] = useState({});
    const userData = useContext(AuthContext);
    const history = useHistory();
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect( () => {
        if( userData === null ){
            history.push( "/login" );
        } else {
            const userId = userData.claims.jti;
            const jwt = userData.jwt;
          fetch( "http://localhost:8080/api/resume/" + 1,
          //props.id
          {headers: {
            Authorization: `Bearer ${jwt}`
          }
           })
          .then(async response => {
              if( response.status === 200 ){
                  return response.json();
              } else if(response.status === 400){
                  setIsEmpty(true);
                  return response.json();
              
              } else (console.log( await response.json()))
          } )
          .then( resumeInfo => {
              console.log(resumeInfo); //just to see what we get
              setResume(resumeInfo);
          });
      }
    });

    return(
        <div className="page">
        <Link to="/api/addResume" className="addBtn"> Add Resume</Link>
        {!isEmpty ?
        <div className="container">
            
        </div>
        : <div className="container"> No Resume Found</div>}
    
        
        </div> 
        
       
      );
    }

export default ViewFullResume;