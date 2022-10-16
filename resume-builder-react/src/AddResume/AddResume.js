import { useEffect, useState } from "react";
import { Button } from "react-foundation";
import FormInput from "../FormInput/FormInput";
import "./AddResume.css";
import "../ErrorMessages/ErrorMessages.js"
import ErrorMessages from "../ErrorMessages/ErrorMessages.js";
import AddEducationForm from "../AddEducationForm/AddEducationForm";

function AddResume(props) {
  const [addEdFormValues, setAddEdFormValues] = useState([]);
  const [addWorkFormValues, setAddWorkFormValues] = useState([]);
  const [token, setToken] = useState(null);
  const [skills, setSkills] = useState([]);
  const [Education, setEducation] = useState([]);
  


  function insertEducationForm() {
    let newfield = {schoolName:"" ,educationLevel:""};

    setAddEdFormValues([...addEdFormValues, newfield]);
  
  }
  function AddWorkForm() {
    let newfield = {};

    setAddWorkFormValues([...addWorkFormValues, newfield]);
  }

  useEffect(
    () => {
      getToken();
    },
    []);

  function getToken() {
    const data = {
      client_id: "hg1ia7ve82cicywk",
      client_secret: "szCLH5LE",
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
      setSkills(skillList.data.map(s => s.skill.name))
      console.log(skillList);
    })
      ;
    
  }

  function handleClick(event) {
    const descriptionText = document.getElementById('jobDescription');
    
    const description = { text: descriptionText.value, confidenceThreshold: 0.6 };
    skillsChecker(description);
  }

  function educationUpdateHandler(education,index){
    const copy = [...addEdFormValues];

    copy[index] = education;
    setAddEdFormValues(copy);
  }


  
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
          addEdFormValues.map((input, index) => 
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
          {addWorkFormValues.map((input, index) => {
            return (
              <div key={index} className="form">
                <FormInput
                  inputType={"text"}
                  identifier={"jobTitle "}
                  labelText={"Job Title"}
                  currVal={""}
                />
                <FormInput
                  inputType={"date"}
                  identifier={"startDate "}
                  labelText={"Start Date"}
                  currVal={""}
                />
                <FormInput
                  inputType={"date"}
                  identifier={"endDate "}
                  labelText={"End Date"}
                  currVal={""}
                />
                <FormInput
                  inputType={"text"}
                  identifier={"address"}
                  labelText={"Address"}
                  currVal={""}
                />
                <FormInput
                  inputType={"text"}
                  identifier={"phoneNumber"}
                  labelText={"Phone Number"}
                  currVal={""}
                />
                <label htmlFor="description">
                  {" "}
                  Job Description
                  <textarea
                    className="textarea"
                    id={"jobDescription"}
                    name={"jobDescription" }
                    
                    // + index
                  //onChange={skillsChecker} would be nice but cant because of montly limit
                  />
                </label>
                <Button onClick={handleClick}> load skills</Button>
                {skills.map(s=> <h1 className="card"> {s}</h1>)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddResume;
