import { useContext, useState, useEffect } from "react";
import { Button } from "react-foundation";
import { Link, useHistory, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
<<<<<<< HEAD
=======
import GenericPdfDownloader from "../Download/Download";
import Dummy from "../Dummy";
import EducationsFromResume from "../EducationsFromResume/EducationsFromResume";
import SkillsFromResume from "../SkillsFromResume/SkillsFromResume";
>>>>>>> b2f3b20f8b6efa002a3fe4a680b91e50b45ab0f5
import Template1 from "../TemplateFolder/Template1";
import Template2 from "../TemplateFolder/Template2";
import Template3 from "../TemplateFolder/Template3";
import Template5 from "../TemplateFolder/Template5";
import Template4 from "../TemplateFolder/Template4";
import "./ViewFullResume.css";


function ViewFullResume(props) {

    const [resume, setResume] = useState({});
    const userData = useContext(AuthContext);
    const history = useHistory();
    const [isEmpty, setIsEmpty] = useState(false);
    const [educations, setEducations] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [skills, setSkills] = useState([])
    const [workHistories, setWorkHistories] = useState([])
    const { id } = useParams();

    useEffect(() => {

        if (userData === null) {
            history.push("/login");
        } else {
            const userId = userData.claims.jti;
            const jwt = userData.jwt;
            fetch("http://localhost:8080/api/resume/" + id,
                //props.id
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
                    setResume(resumeInfo);
                    setEducations(resumeInfo.educations)
                    setUserInfo(resumeInfo.userInfo)
                    setSkills(resumeInfo.skills)
                    setWorkHistories(resumeInfo.workHistories)
                });
        }
    }, [id]);

    function loadResume() {
        switch (resume.templateId) {
            case 1:
                return (
                    <Template1
                        key={resume.resumeId}
                        educations={educations}
                        skills={skills}
                        workHistories={workHistories}
                        userInfo={userInfo} />
                )
            case 2:
                return (
                    <Template2
                        key={resume.resumeId}
                        educations={educations}
                        skills={skills}
                        workHistories={workHistories}
                        userInfo={userInfo} />
                )
            case 3:
<<<<<<< HEAD
                return (
                    <Template3
                        key={resume.resumeId}
                        educations={educations}
                        skills={skills}
                        workHistories={workHistories}
                        userInfo={userInfo} />
                )
            case 4:
                return (
                    <Template4
                        key={resume.resumeId}
                        educations={educations}
                        skills={skills}
                        workHistories={workHistories}
                        userInfo={userInfo} />
                )
            case 5:
                return (
                    <Template5
                        key={resume.resumeId}
                        educations={educations}
                        skills={skills}
                        workHistories={workHistories}
                        userInfo={userInfo} />
                )
=======
                return(
                    <Template3 
                    key={resume.resumeId} 
                    educations={educations} 
                    skills={skills}
                    workHistories={workHistories} 
                    userInfo={userInfo}/>
                    
                    )
        
            
>>>>>>> b2f3b20f8b6efa002a3fe4a680b91e50b45ab0f5
            default:
                break;
        }
    }


    return (

        <div className="page">
<<<<<<< HEAD

=======
            <GenericPdfDownloader
            downloadFileName="resume.pdf" 
            rootElementId="Resume" 
            />
        
>>>>>>> b2f3b20f8b6efa002a3fe4a680b91e50b45ab0f5
            {!isEmpty ?
                <div id="Resume">
                    {loadResume()}
                </div>
                : <div className="container"> No Resume Found</div>}


        </div>


    );
}

export default ViewFullResume;