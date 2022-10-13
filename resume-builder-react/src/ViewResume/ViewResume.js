import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import "./ViewResume.css";
import Resume from "../Resume/Resume";
import { useHistory } from "react-router-dom";

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
      fetch( "http://localhost:8080/api/resume/" + 1,
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
    
    <div className="ResumeTable">
      <table>
        <thead>
          <tr>
            <th width="200">Resume Id</th>
            <th>Resume Description</th>
            <th width="150">Public</th>
            <th width="150"></th>
          </tr>
        </thead>
        <tbody>
        {resumes.map((c) => (
          <Resume
            resumeData={c}
            // onResumeDeleted={onResumeDeleted}
          />
        ))}
        </tbody>
      </table>
    </div>
    
   
  );
}
export default ViewResume;
