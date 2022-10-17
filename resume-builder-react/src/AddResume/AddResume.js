import { useContext, useEffect, useState } from "react";
import { Badge, Button } from "react-foundation";
import FormInput from "../FormInput/FormInput";
import "./AddResume.css";
import "../ErrorMessages/ErrorMessages.js"
import ErrorMessages from "../ErrorMessages/ErrorMessages.js";
import AddEducationForm from "../AddEducationForm/AddEducationForm";
import AddWorkHistoryForm from "../AddWorkHistoryForm/AddWorkHistoryForm";
import AuthContext from "../AuthContext";
import { useHistory } from "react-router-dom";

function AddResume(props) {
  const [addedEducation, setAddedEducation] = useState([]);
  const [addedWorkHistory, setAddedWorkHistory] = useState([]);
  const [addedSkills, setAddedSkills] = useState([]);
  const [token, setToken] = useState(null);
  const [skillsList, setSkills] = useState([]);
  const userData = useContext(AuthContext);
  const history = useHistory();

  


  function insertEducationForm() {
    let newfield = {schoolName:"" ,educationLevel:""};

    setAddedEducation([...addedEducation, newfield]);
  
  }
  function AddWorkForm() {
    let newfield = {};

    setAddedWorkHistory([...addedWorkHistory, newfield]);
  }

  useEffect(
    () => {
      getToken();
    },
    []);

  function getToken() {
    const data = {
      client_id: "bdorv9di1ub0oxyy",
      client_secret: "4qajWwcO",
      grant_type: "client_credentials",
      scope: "emsi_open",
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://auth.emsicloud.com/connect/token", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("pass");
          return response.json();
        } else if (response.status === 400) {
          console.log(await response.json());
        } else console.log(await response.json());
      })
      .then(async (tokenObj) => {
        setToken(await tokenObj);
        console.log(token);
      });
  }

  function skillsChecker(description) {
    setAddedSkills([])
    
    

    fetch(
      "https://emsiservices.com/skills/versions/latest/extract?language=en",
      {
        method: "POST",
        body: JSON.stringify(description),
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json"
        },
      }
    ).then(async (response) => {
      if (response.status === 200) {

        console.log("Success");
        return await response.json();
      } else if (response.status === 400) {
        console.log(await response.json());
      } else console.log(await response.json());
    }).then((skillList) => {
      setSkills(skillList.data.map(s =>  s.skill.name))
      console.log(skillList);
    });
    
  }

  

  function educationUpdateHandler(education,index){
    const copy = [...addedEducation];

    copy[index] = education;
    setAddedEducation(copy);
  }

  function workHistoryUpdateHandler(workHistory,index){
    const copy = [...addedWorkHistory];

    copy[index] = workHistory;
    setAddedWorkHistory(copy);
  }

  function addSkillClick(evt){
    const btn = document.getElementById(evt.target.value);

    
    console.log(btn.style.backgroundColor)
    if(btn.style.backgroundColor != 'green'){
      btn.style.backgroundColor = 'green'
      const newSkillsList = addedSkills.concat({skillName : evt.target.value})
      setAddedSkills(newSkillsList)
    }
    else{
      btn.style.backgroundColor = ''
      const newSkillsList = addedSkills.filter(s => s.skillName != evt.target.value)
      setAddedSkills(newSkillsList)
    }
    
  }

  


  function onSubmit(event){
    event.preventDefault();
    
    const resume = {workHistories : addedWorkHistory,
                    educations : addedEducation,
                    skills : addedSkills
                    };
    const userId = userData.claims.jti;
    const jwt = userData.jwt;

    fetch( "http://localhost:8080/api/resume", {
        method: "POST",
        body: JSON.stringify(resume),
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json"          
        }
    }).then(async response => {
        if( response.status === 201 ){
            
            history.push( "/api/resume/1" );
           
            
        } else {
            console.log(await response.json());
            //Display error messages
        }
    });
}


  console.log(addedSkills)
 

  return (
    <div className="container">
      <div className="form-group">
        <nav aria-label="You are here:" role="navigation">
          <ul className="breadcrumbs">
            <li>
              <a href="#Education">Education</a>
            </li>
            <li>
              <a href="#WorkHistory">Work history</a>
            </li>
            <li>
              <a href="">Template</a>
            </li>
          </ul>
        </nav>
        <div id="Education">
          <h2>Education</h2>
          <Button onClick={insertEducationForm}>Add Education</Button>
          {
          addedEducation.map((input, index) => 
            <AddEducationForm 
            education={input}
            index={index}
            onEducationUpdated={educationUpdateHandler}
            />
          )}
        </div>
        <div id="WorkHistory">
          <h2>Work History</h2>
          <Button onClick={AddWorkForm}>Add Work History</Button>
          {addedWorkHistory.map((input, index) => 
             <AddWorkHistoryForm 
             workHistory={input}
             index={index}
             onWorkHistoryUpdated={workHistoryUpdateHandler}
             skillsChecker = {skillsChecker}
             />
             
           )}
           {skillsList.map(s=> <Button className="pill" id={s} value={s} onClick={addSkillClick}> {s}</Button>)}
           
        </div>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}

export default AddResume;
