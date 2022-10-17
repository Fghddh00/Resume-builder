function Template1({educations,skills, workHistories, userInfo }){

    
    console.log(educations)


    return(
        <div>
            {educations.map(s=> s.schoolName)}
        </div>
    );
}

export default Template1;