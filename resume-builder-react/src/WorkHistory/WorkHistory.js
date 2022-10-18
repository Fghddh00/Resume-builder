function WorkHistory({company, jobTitle, startDate, endDate, jobDescription}){

    return(
        <div className="workHistory">
            <h6>{company}</h6>
            <h6>{jobTitle}</h6>
            <h6>{startDate}</h6>
            <h6>{endDate}</h6>
            <h6>{jobDescription}</h6>
        </div>
    )

}
export default WorkHistory;