
import { Cell, Grid, GridContainer } from "react-foundation";
import Education from "../Education/Education";
import WorkHistory from "../WorkHistory/WorkHistory";
import "./template2.css";

function Template2({educations,skills, workHistories, userInfo }){

    
    console.log(educations)
    console.log(skills)
    console.log(workHistories)
    console.log(userInfo);


    return(
        <GridContainer className="template2">
        <Grid >
            <Cell className="nameHeader">
            <h1 >{userInfo.firstName} {userInfo.lastName}</h1>
            <a href={`mailto:${userInfo.email}`}> {userInfo.email} </a>
            </Cell>
        </Grid>
        <Grid>
            <h3>Education</h3>
            <Cell className="education2">
            <ul>
                {educations.map(s=>
                    <li>
                    <Education
                    schoolName={s.schoolName}
                    educationLevel={s.educationLevel}
                    /></li>)}
            </ul>
            </Cell>
            <h3>Work History</h3>
            <Cell className="WrokHistory2">
            <ul>
                {workHistories.map(s=>
                    <li>
                    <WorkHistory
                    company={s.company}
                    jobTitle={s.jobTitle}
                    startDate={s.startDate}
                    endDate={s.endDate}
                    jobDescription={s.jobDescription}
                    /></li>)}
            </ul>
            </Cell>
            <Cell className="WrokHistory2">
            <ul>
                {skills.map(s=>
                    <text>
                     {s.skillName}
                     </text>  )}
            </ul>
            </Cell>
        </Grid>


        </GridContainer>
    );
}

export default Template2;