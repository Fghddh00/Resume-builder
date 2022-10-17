import { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import EducationsFromResume from "../EducationsFromResume/EducationsFromResume";
import SkillsFromResume from "../SkillsFromResume/SkillsFromResume";
import Template1 from "../TemplateFolder/Template1";
import UserInfoFromResume from "../UserInfoFromResume/UserInfoFromResume";
import WorkHistoriesFromResume from "../WorkHistoriesFromResume/WorkHistoriesFromResume";
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
    const {id} = useParams();

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

    function loadResume(){
        switch (resume.templateId) {
            case 1:
                <Template1 key={resume.resumeId} resumeInfo={resume}/>
                break;
        
            default:
                break;
        }
    }


    return (

        <div className="page">
            <Link to="/api/addResume" className="addBtn"> Add Resume</Link>
            {!isEmpty ?
                <div className="container">
                    <h2>Template Id {resume.templateId}</h2>
                    {loadResume}
                    {/* <table>
                        <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <UserInfoFromResume key={userInfo.infoId} infoData={userInfo} />
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>School Name</th>
                                <th>Education Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educations.map(e => <EducationsFromResume key={e.educationId} educationData={e} />)}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Job Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workHistories.map(w => <WorkHistoriesFromResume key={w.workHistoryId} workHistoriesData={w} />)}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Skill Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map(s => <SkillsFromResume key={s.skillId} skillData={s} />)}
                        </tbody>
                    </table> */}
                </div>
                : <div className="container"> No Resume Found</div>}


        </div>


    );
}

export default ViewFullResume;