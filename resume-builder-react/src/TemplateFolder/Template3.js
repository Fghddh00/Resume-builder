import { Grid, GridContainer } from "react-foundation";
import Education3 from "../Template3Components/Education3/Education3";
import WorkHistory3 from "../Template3Components/WorkHistory3/WorkHistory3";
import "./template3.css";

function Template3({ educations, skills, workHistories, userInfo }) {

    return (
        <div className="container">
            <div className="template3">
                {/* Header */}
                <div className="row">
                    <div className="col-xs-12">
                        <div id="text-header" className="text-center">
                            <div id="photo">
                                <img src="https://www.lafd.org/profiles/lafd/themes/lafd_org/logo.png" alt="lafd" />
                            </div>
                            <h1>{userInfo.firstName} {userInfo.lastName}</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-7">
                        <div className="box">
                            <h2><img src="https://cdn-icons-png.flaticon.com/512/732/732952.png" width="25" height="5" alt="suitcase" /> Work Experience</h2>
                            <div class="job clearfix">
                                <div class="row">
                                    <div class="details">
                                        {<WorkHistory3 key={userInfo.userInfoId} workHistories={workHistories} skills={skills} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-5">
                        <div class="box">
                        <h2><img src="https://cdn-icons-png.flaticon.com/512/46/46955.png" width="25" height="5" alt="cap" /> Education</h2>
                            <ul id="education" class="clearfix">
                                <li>
                                    <div class="description pull-right">
                                        {educations.map(e=> <Education3 key={e.educationId} educationData={e}/>)}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Template3;