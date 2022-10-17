import { Grid, GridContainer } from "react-foundation";
import "./template1.css";

function Template1({educations,skills, workHistories, userInfo }){

    
    console.log(educations)


    return(
        <GridContainer>
        <Grid className="template1">
            
            <h1 className="nameHeader">{userInfo.firstName} {userInfo.lastName}</h1>
            
        </Grid>
        </GridContainer>
    );
}

export default Template1;