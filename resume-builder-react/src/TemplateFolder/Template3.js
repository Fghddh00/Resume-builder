import { Grid, GridContainer } from "react-foundation";
import "./template3.css";

function Template3({educations,skills, workHistories, userInfo }){

    
    console.log(educations)


    return(
        <GridContainer>
        <Grid className="template3">
            <h1 className="nameHeader">{userInfo.firstName} {userInfo.lastName}</h1>
        </Grid>
        </GridContainer>
    );
}

export default Template3;