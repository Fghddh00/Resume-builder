function Template1(props){

    const educations = props.resumeInfo.resumeId;
    const skills = props.resumeInfo.skills;
    console.log(educations)


    return(
        <div>
            {console.log(educations)}
        </div>
    );
}

export default Template1;