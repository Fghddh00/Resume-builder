import { useContext, useState, useEffect } from "react";
import { Button } from "react-foundation";
import { useHistory, useParams } from "react-router-dom";
import AddEducationForm from "../AddEducationForm/AddEducationForm";
import AuthContext from "../AuthContext";
import "./EditResume.css";
import AddWorkHistoryForm from "../AddWorkHistoryForm/AddWorkHistoryForm";
import AddAppUserInfoForm from "../AddAppUserInfoForm/AddAppUserInfoForm";

function EditResume(props) {
    const [addedEducation, setAddedEducation] = useState([]);
    const [addedWorkHistory, setAddedWorkHistory] = useState([]);
    const [addedAppUserInfo, setAddedAppUserInfo] = useState([]);
    const [resumeId,setResumeId] = useState(null);
    const [token, setToken] = useState(null);
    const [addedSkills, setAddedSkills] = useState([]);
    const [skillsList, setSkills] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const { id } = useParams();
    

    function insertEducationForm() {
        let newfield = { schoolName: "", educationLevel: "" };

        setAddedEducation([...addedEducation, newfield]);

    }
    function educationUpdateHandler(education, index) {
        const copy = [...addedEducation];

        copy[index] = education;
        setAddedEducation(copy);
    }
    function AddWorkForm() {
        let newfield = { jobTitle: "", startDate: "", endDate: "", jobDescription: "" };

        setAddedWorkHistory([...addedWorkHistory, newfield]);
    }
    function workHistoryUpdateHandler(workHistory, index) {
        const copy = [...addedWorkHistory];

        copy[index] = workHistory;
        setAddedWorkHistory(copy);
    }
    function insertAppUserInfoFrom() {
        let newfield = { email: "", firstName: "", lastName: "", address: "", phoneNumber: "" };

        setAddedAppUserInfo([...addedAppUserInfo, newfield]);
    }
    function appUserInfoUpdateHandler(appUserInfo, index) {
        const copy = [...addedAppUserInfo];

        copy[index] = appUserInfo;
        setAddedAppUserInfo(copy);
    }
    function handleClick(event) {
        const descriptionText = document.getElementById('jobDescription');

        const description = { text: descriptionText.value, confidenceThreshold: 0.6 };
        skillsChecker(description);
    }
    useEffect(() => {
        getToken();

        if (userData === null) {
            history.push("/login");
        } else {

            const userId = userData.claims.jti;
            const jwt = userData.jwt;
            console.log(id);
            fetch("http://localhost:8080/api/resume/" + id ,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                .then(async response => {

                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 400) {
                        setIsEmpty(true);
                        return response.json();

                    } else (console.log(await response.json()))
                })
                .then(resumeInfo => {
                    console.log(resumeInfo)
                    setAddedEducation(resumeInfo.educations)
                    setAddedWorkHistory(resumeInfo.workHistories)
                    setAddedSkills(resumeInfo.skills)
                    setSkills(resumeInfo.skills.map(s => s.skillName))
                    setAddedAppUserInfo(resumeInfo.userInfo)
                    setResumeId(resumeInfo.resumeId)
                    //just to see what we get
                });
        }
    }, [id]);


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
            setSkills(skillList.data.map(s => s.skill.name))
            console.log(skillList);
        });

    }
    function addSkillClick(evt) {
        const btn = document.getElementById(evt.target.value);


        console.log(btn.style.backgroundColor)
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

    const userData = useContext(AuthContext);
    const history = useHistory();


    function onSubmit(event) {
        event.preventDefault();

        const resume = {
            workHistories: addedWorkHistory,
            educations: addedEducation,
            skills: addedSkills,
            userInfo: addedAppUserInfo,
            templateId: 1,
            resumeId: resumeId
        };
        const userId = userData.claims.jti;
        const jwt = userData.jwt;

        fetch("http://localhost:8080/api/resume/" + id, {
            method: "PUT",
            body: JSON.stringify(resume),
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if (response.status === 204) {

                history.push("/api/resume/" + id);

            } else {
                console.log(await response.json());
                //Display error messages
            }
        });
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

export default EditResume;