import { Grid, GridContainer } from "react-foundation";
import "./template3.css";

function Template3({ educations, skills, workHistories, userInfo }) {

    return (

        <div class="wrapper">
            <div class="resume">
            <div class="skills_wrap pb">
                    <div class="title">
                        Contact
                    </div>
                    <div class="skills">
                        <ul>
                            <li>
                                <div class="li_wrap">
                                    <div class="icon"><i class="fas fa-mobile-alt" aria-hidden="true"></i></div>
                                    <div class="text">OtherStuff</div>
                                </div>
                            </li>
                            <li>
                                <div class="li_wrap">
                                    <div class="icon"><i class="fas fa-envelope" aria-hidden="true"></i></div>
                                    <div class="text">{userInfo.email}</div>
                                </div>
                            </li>
                            <li>
                                <div class="li_wrap">
                                    <div class="icon"><i class="fab fa-weebly" aria-hidden="true"></i></div>
                                    <div class="text">{userInfo.phoneNumber}</div>
                                </div>
                            </li>
                            <li>
                                <div class="li_wrap">
                                    <div class="icon"><i class="fas fa-map-signs" aria-hidden="true"></i></div>
                                    <div class="text">{userInfo.address}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="skills_wrap pb">
                    <div class="title">
                        Skills
                    </div>
                    <div class="skills">
                        <ul>
                            <li>
                                <div class="li_wrap">
                                    <div class="icon"><i class="fab fa-html5"></i></div>
                                    <div class="text">{skills.map(s => s.skillName)}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="header">
                    <div class="name_role">
                        <div class="name">
                            {userInfo.firstName} {userInfo.lastName}
                        </div>
                        <div class="role">
                            {workHistories.map(w => w.jobTitle)}
                        </div>
                    </div>
                </div>
                <div class="right_inner" color="white">
                    <div class="exp">
                        <div class="title">
                            experience
                        </div>
                        <div class="exp_wrap">
                            <ul>
                                <li>
                                    <div class="li_wrap">
                                        <div class="date">
                                            {workHistories.map(w => w.startDate)} - {workHistories.map(w => w.endDate)}
                                        </div>
                                        <div class="info">
                                            <p class="info_title">
                                                {workHistories.map(w => w.jobTitle)}                                            </p>

                                            <p class="info_cont">
                                                {workHistories.map(w => w.jobDescription)}                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="education">
                        <div class="title">
                            Education
                        </div>
                        <div class="education_wrap">
                            <ul>
                                <li>
                                    <div class="li_wrap">
                                        <div class="date">

                                        </div>
                                        <div class="info">
                                            <p class="info_title">
                                            {educations.map(e => e.schoolName)}
                                            </p>
                                            <p class="info_com">
                                                {educations.map(e => e.educationLevel)}
                                            </p>
                                        </div>
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