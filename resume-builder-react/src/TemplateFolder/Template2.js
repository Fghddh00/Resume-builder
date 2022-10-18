
import { Cell, Grid, GridContainer } from "react-foundation";
import Education from "../Education/Education";
import Skill from "../Skill/Skill";
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
            <div className="page">
            <Cell>
            <h1 className="nameHeader2">{userInfo.firstName} {userInfo.lastName}</h1>
            <ul id="userInformation">{userInfo.email}</ul>
            <ul id="userInformationMargin">{userInfo.address}</ul>
            <ul id="userInformationMargin">{userInfo.phoneNumber}</ul>
            </Cell>
            <Cell>
            <h5>Education</h5>
            
            <ul  >{educations.map(e =>
                       <li className="resumeInfo"><Education 
                       schoolName={e.schoolName}
                       educationLevel={e.educationLevel}
                       /></li>
            )}
           </ul>
           
           </Cell>
            <hr></hr>
            <Cell>
            <h5 >Work History</h5>
            <ul >{workHistories.map(w =>
                <li className="resumeInfo"><WorkHistory 
                company={w.company} 
                jobTitle={w.jobTitle}
                startDate={w.startDate}
                endDate={w.endDate}
                jobDescription={w.jobDescription}
                /></li>
                )}
            </ul>
            </Cell>
            <hr></hr>
            <Cell>
            <h5 className="skill2">Skills:</h5>
            <ul>{skills.map(s =>
                <Skill 
                skillName={s.skillName}
                />
            )}</ul>
            </Cell>
             </div>

             

        </Grid>
        </GridContainer>
    );
}

export default Template2;