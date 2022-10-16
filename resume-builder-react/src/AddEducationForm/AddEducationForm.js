import FormInput from "../FormInput/FormInput";


function AddEducationForm({education, onEducationUpdated, index}){
    function updateEducation(evt){
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const copy = {...education};
        copy[name] = value;

        onEducationUpdated(copy,index);
    }

    return(
        
            <div key={index} className="form">
              {/* educationForm component to track one object and send list of objects */}
              <FormInput
                inputType={"text"}
                identifier={"schoolName"}
                labelText={"School Name"}
                currVal={education.schoolName}
                onChangeHandler={updateEducation}
              />
              <FormInput
                inputType={"text"}
                identifier={"educationLevel"}
                labelText={"Education Level"}
                currVal={education.educationLevel}
                onChangeHandler={updateEducation}
              />
            </div>
          );
          
}

export default AddEducationForm;