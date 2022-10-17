import { useContext, useState, useEffect } from "react";
import { Button } from "react-foundation";
import { useHistory } from "react-router-dom";
import AddEducationForm from "../AddEducationForm/AddEducationForm";
import FormInput from "../FormInput/FormInput";
import AuthContext from "../AuthContext";
import "./EditResume.css";

function EditResume(props) {
    const [addEdFormValues, setAddEdFormValues] = useState([]);
    const [addWorkFormValues, setAddWorkFormValues] = useState([]);
    const [token, setToken] = useState(null);
    const [skills, setSkills] = useState([]);
    const [Education, setEducation] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    function insertEducationForm() {
        let newfield = { schoolName: "", educationLevel: "" };

        setAddEdFormValues([...addEdFormValues, newfield]);

    }
    function educationUpdateHandler(education, index) {
        const copy = [...addEdFormValues];

        copy[index] = education;
        setAddEdFormValues(copy);
    }
    function AddWorkForm() {
        let newfield = {};

        setAddWorkFormValues([...addWorkFormValues, newfield]);
    }

    function handleClick(event) {
        const descriptionText = document.getElementById('jobDescription');

        const description = { text: descriptionText.value, confidenceThreshold: 0.6 };
        skillsChecker(description);
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

    const userData = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (userData === null) {
            history.push("/login");
        } else {
            const userId = userData.claims.jti;
            const jwt = userData.jwt;
            fetch("http://localhost:8080/api/resume/" + 1,
                //{props.id} when in actual use
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
                    console.log(resumeInfo); //just to see what we get
                });
        }
    });

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
                                    name={"jobDescription"}
                                />
                            </label>
                            <Button onClick={handleClick}> load skills</Button>
                            {skills.map(s => <h1 className="card"> {s}</h1>)}
                        </div>
                    );
                })}
            </div>
        </div>

    );

}

export default EditResume;