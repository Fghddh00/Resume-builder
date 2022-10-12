import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import "./ViewResume.css";
import Resume from "../Resume/Resume";

function ViewResume() {
  const [resumes, setResumes] = useState([]);

  

//   function loadAllResumes(){
//       fetch( "http://localhost:8080/resume" )
//       .then(async response => {
//           if( response.status === 200 ){
//               return response.json();
//           } else (console.log(response.json()))
//       } )
//       .then( resumeList => {
//           setResumes( resumeList );
//       });
//   }
//   useEffect(
//       () => {
//           loadAllResumes();
//       },
//   []);

  function onResumeDeleted() {
    // loadAllResumes();
  }

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
            onResumeDeleted={onResumeDeleted}
          />
        ))}
        </tbody>
      </table>
    </div>
    
   
  );
}
export default ViewResume;
