import { useContext, useEffect, useState } from "react";
import { Badge, Button } from "react-foundation";
import "./AddResume.css";
import "../ErrorMessages/ErrorMessages.js"
import AddEducationForm from "../AddEducationForm/AddEducationForm";
import AddWorkHistoryForm from "../AddWorkHistoryForm/AddWorkHistoryForm";
import AuthContext from "../AuthContext";
import { useHistory } from "react-router-dom";
import AddAppUserInfoForm from "../AddAppUserInfoForm/AddAppUserInfoForm";

function AddResume(props) {
  const [addedEducation, setAddedEducation] = useState([]);
  const [addedWorkHistory, setAddedWorkHistory] = useState([]);
  const [addedAppUserInfo, setAddedAppUserInfo] = useState([]);
  const [addedSkills, setAddedSkills] = useState([]);
  const [token, setToken] = useState(null);
  const [skillsList, setSkills] = useState([]);
  const userData = useContext(AuthContext);
  const history = useHistory();

  function insertEducationForm() {
    let newfield = { schoolName: "", educationLevel: "" };

    setAddedEducation([...addedEducation, newfield]);

  }
  function AddWorkForm() {
    let newfield = {};

    setAddedWorkHistory([...addedWorkHistory, newfield]);
  }
  function insertAppUserInfoFrom() {
    let newfield = { email: "", firstName: "", lastName: "", address: "", phoneNumber: "" };

    setAddedAppUserInfo([...addedAppUserInfo, newfield]);
  }
  useEffect(
    () => {
      getToken();
    },
    []);

  function getToken() {
    const data = {
      client_id: "r07k7k37dvf4k0id",
      client_secret: "M49XXMSS",
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
    // const tempSkillsList = skillsList
    // const tempAddedSkills = addedSkills
    //would like to figure out a way to limit duplicate skills being added
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
      const tempList = skillsList.concat(skillList.data.map(s => s.skill.name))
      setSkills(tempList)
      console.log(skillList);
    });

  }


  function educationUpdateHandler(education, index) {
    const copy = [...addedEducation];

    copy[index] = education;
    setAddedEducation(copy);
  }

  function workHistoryUpdateHandler(workHistory, index) {
    const copy = [...addedWorkHistory];

    copy[index] = workHistory;
    setAddedWorkHistory(copy);
  }
  function appUserInfoUpdateHandler(appUserInfo, index) {
    const copy = [...addedAppUserInfo];

    copy[index] = appUserInfo;
    setAddedAppUserInfo(copy);
  }

  function addSkillClick(evt) {
    const btn = document.getElementById(evt.target.value);

    if (btn.style.backgroundColor != 'green') {
      btn.style.backgroundColor = 'green'
      const newSkillsList = addedSkills.concat({ skillName: evt.target.value })
      setAddedSkills(newSkillsList)
    }
    else {
      btn.style.backgroundColor = ''
      const newSkillsList = addedSkills.filter(s => s.skillName != evt.target.value)
      setAddedSkills(newSkillsList)
    }

  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(addedAppUserInfo);
    const resume = {
      workHistories: addedWorkHistory,
      educations: addedEducation,
      skills: addedSkills,
      userInfo: addedAppUserInfo[0],
      templateId: 2

    };

    console.log(resume.userInfo)
    const userId = userData.claims.jti;
    const jwt = userData.jwt;
    fetch("http://localhost:8080/api/resume", {
      method: "POST",
      body: JSON.stringify(resume),
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
      }
    }).then(async response => {
      if (response.status === 201) {

        history.push("/api/resume/1");


      } else {
        console.log(await response.json());
        //Display error messages
      }
    });
  }

  return (
    <div className="container">
      <div className="addForm">
        <nav aria-label="You are here:" role="navigation">
          <ul className="breadcrumbs">
            <li>
              <a href="#Education">Education</a>
            </li>
            <li>
              <a href="#WorkHistory">Work history</a>
            </li>
            <li>
              <a href="#AppUserInfo">User Info</a>
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
              skillsChecker={skillsChecker}
            />

          )}
          {skillsList.map(s => <Button className="pill" id={s} value={s} onClick={addSkillClick}> {s}</Button>)}
        </div>
        <div id="AppUserInfo">
          
          <h2>User Info</h2>
          <AddAppUserInfoForm
            appUserInfo={addedAppUserInfo}
            onAppUserInfoUpdated={appUserInfoUpdateHandler}
          />
        </div>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}

export default AddResume;
