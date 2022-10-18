import "./WorkHistory3.css";

function WorkHistory3({ workHistories, skills }) {

    return (
        <div>
            {workHistories.map(w =>
                <div>
                    <div className="row">
                        <div className="details">
                            <div className="year">From: {w.startDate} To:{w.endDate}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="job-details col-xs-11">
                            <div className="profession">{w.jobTitle}</div>
                            <div className="description">
                                {w.jobDescription}
                                <div class="highlights">Skills</div>
                                <ul class="list-group">
                                    {skills.map(s =>
                                        <li class="list-group-item">{s.skillName} </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkHistory3;