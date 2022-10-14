import { useState } from "react";
import { Button } from "react-foundation";
import AddEducation from "../AddEducation/AddEducation";
import FormInput from "../FormInput/FormInput";
import "./AddResume.css";

function AddResume(props) {
    const [addFormValues, setAddFormValues] = useState([ { name: '', age: '' }]);

    function AddEducationForm(){
        let newfield = { name: '', age: '' }

        setAddFormValues([...addFormValues, newfield])
    }
    function AddWorkHistoryForm(){

    }

  return (
    <div className="container">
    <div className="form-group">
        <nav aria-label="You are here:" role="navigation">
          <ul className="breadcrumbs">
            <li>
              <a href="#Education" >Education</a>
            </li>
            <li>
              <a href="#WorkHistory">Work history</a>
            </li>
            <li>
            <a href="" >Template</a>
            </li>
          </ul>
        </nav>
        <div id="Education">
        <h2>Education</h2>
        <Button onClick={AddEducationForm}>Add Education</Button>
        {addFormValues.map((input, index) => {
          return (
            <div key={index}>
              <FormInput
              inputType={"text"} 
              identifier={"schoolName"} 
              labelText={"School Name"} 
              currVal={""} 
                />
             <FormInput
              inputType={"text"} 
              identifier={"educationLevel"} 
              labelText={"Education Level"} 
              currVal={""} 
                />
                <FormInput
              inputType={"text"} 
              identifier={"location"} 
              labelText={"Location"} 
              currVal={""} 
                />
            </div>
          )
        })}
        </div>
        <div id="WorkHistory">
        <h2>Work History</h2>
        <Button>Add Work History</Button>
        </div>
      </div>
    </div>
  );
}

export default AddResume;
