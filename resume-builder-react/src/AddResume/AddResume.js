import { useState } from "react";
import { Button } from "react-foundation";
import AddEducation from "../AddEducation/AddEducation";
import FormInput from "../FormInput/FormInput";
import "./AddResume.css";

function AddResume(props) {
    const [addFormValues, setAddFormValues] = useState([ { }]);

    function AddForm(){
        let newfield = {  }

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
        <Button onClick={AddForm}>Add Education</Button>
        {addFormValues.map((input, index) => {
          return (
            <div key={index} className="form">
              <FormInput
              inputType={"text"} 
              identifier={"schoolName " + index} 
              labelText={"School Name"} 
              currVal={""} 
                />
             <FormInput
              inputType={"text"} 
              identifier={"educationLevel " + index} 
              labelText={"Education Level"} 
              currVal={""} 
                />
            </div>
          )
        })}
        </div>
        <div id="WorkHistory">
        <h2>Work History</h2>
        <Button onClick={AddForm}>Add Work History</Button>
        {addFormValues.map((input, index) => {
          return (
            <div key={index} className="form">
              <FormInput
              inputType={"text"} 
              identifier={"jobTitle " + index} 
              labelText={"Job Title"} 
              currVal={""} 
                />
             <FormInput
              inputType={"date"} 
              identifier={"startDate " + index} 
              labelText={"Start Date"} 
              currVal={""} 
                />
                <FormInput
              inputType={"date"} 
              identifier={"endDate " + index} 
              labelText={"End Date"} 
              currVal={""} 
                />
                <label> Job Description
                <textarea className="textarea" id={"jobDescription"  + index} name={"jobDescription"  + index}/>
                </label>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  );
}

export default AddResume;
