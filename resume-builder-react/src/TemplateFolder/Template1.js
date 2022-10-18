import { Grid, GridContainer } from "react-foundation";
import Education from "../Education/Education";
import WorkHistory from "../WorkHistory/WorkHistory";
import "./template1.css";

function Template1({educations,skills, workHistories, userInfo }){

    
    console.log(educations)
    console.log(workHistories)
    console.log(skills)
    console.log(userInfo)


    return(
        <GridContainer>
        <Grid className="template1">
            
            {/* <h1 className="nameHeader">{userInfo.firstName}{userInfo.lastName}</h1> */}
            <div>
            <h1 className="nameHeader">{userInfo.firstName} {userInfo.lastName}</h1>
            <ul id="userInformation">{userInfo.email}</ul>
            <ul id="userInformationMargin">{userInfo.address}</ul>
            <ul id="userInformationMargin">{userInfo.phoneNumber}</ul>
            <ul id="educationHeader">Education</ul>
            <ul id="educationInfo">{educations.map(e =>
                       <Education 
                       schoolName={e.schoolName}
                       educationLevel={e.educationLevel}
                       />
            )}
           </ul>
            <hr></hr>
            
            <h5 id="workHistoryHeader">Work History</h5>
            <ul id="workHistoryInfo">{workHistories.map(w =>
                <WorkHistory 
                
                jobtitle={w.jobtitle}
                startDate={w.startDate}
                endDate={w.endDate}
                jobDescription={w.jobDescription}
                />
                )}
            </ul>

            <hr></hr>
            
            <h5 id="skillHeader">Skills</h5>
            <ul id="skillInfo">{skills.skillName}</ul>
            not getting skills
            
             </div>
        

        </Grid>
        </GridContainer>
    );
}

export default Template1;