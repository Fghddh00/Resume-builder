import { Grid, GridContainer } from "react-foundation";
import "./template2.css";

function Template2({educations,skills, workHistories, userInfo }){

    
    console.log(educations)


    return(
        <GridContainer>
        <Grid className="template1">
            <h1 className="nameHeader">{userInfo.firstName} {userInfo.lastName}</h1>
        </Grid>
        </GridContainer>
    );
}

export default Template2;