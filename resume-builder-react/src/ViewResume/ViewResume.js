import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import "./ViewResume.css";
import Resume from "../Resume/Resume";
import { Link, useHistory } from "react-router-dom";

function ViewResume() {
  const [resumes, setResumes] = useState([]);
  const userData = useContext(AuthContext);
  const history = useHistory();

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
          } else (console.log( await response.json()))
      } )
      .then( resumeList => {
          setResumes( resumeList );
      });
  }
}, []);
  

  // function onResumeDeleted() {
  //   loadAllResumes();
  // }

  return (
    <div className="page">
    <Link className="addBtn"> Add Resume</Link>
    <div className="ResumeTable">
        {resumes.map((c) => (
          <Resume
            resumeId = {c.resumeId}
            //onResumeDeleted={onResumeDeleted}
          />
        ))}
        
    </div>
    </div> 
    
   
  );
}
export default ViewResume;
