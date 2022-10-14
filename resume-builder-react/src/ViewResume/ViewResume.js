import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import "./ViewResume.css";
import Resume from "../Resume/Resume";
import { Link, useHistory } from "react-router-dom";

function ViewResume() {
  const [resumes, setResumes] = useState([]);
  const userData = useContext(AuthContext);
  const history = useHistory();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect( () => {
    if( userData === null ){
        history.push( "/login" );
    } else {
        const userId = userData.claims.jti;
        const jwt = userData.jwt;
      fetch( "http://localhost:8080/api/resume/user",
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
      .then( resumeList => {
          setResumes( resumeList );
      });
  }
});
  

  return (
    <div className="page">
    <Link to="/api/addResume" className="addBtn"> Add Resume</Link>
    {!isEmpty ?
    <div className="ResumeTable">
        {resumes.map((c) => (
          <Resume
            resumeId = {c.resumeId}
            templateId = {c.templateId}
          />
        ))} 
        
    </div>
    : <div className="container"> No Resumes Found</div>}
    </div> 
    
   
  );
}
export default ViewResume;
