import { useState } from "react";
import { Button } from "react-foundation";
import FormInput from "../FormInput/FormInput";
import "./AddResume.css";

function AddResume(props) {
    const [addEdFormValues, setAddEdFormValues] = useState([ { }]);
    const [addWorkFormValues, setAddWorkFormValues] = useState([ { }]);

    function AddEducationForm(){
        let newfield = {  }

        setAddEdFormValues([...addEdFormValues, newfield])
    }
    function AddWorkForm(){
        let newfield = {  }

        setAddWorkFormValues([...addWorkFormValues, newfield])
    }
    function skillsChecker(){
        fetch('https://auth.emsicloud.com/connect/token',{
        method: 'POST',
        body: JSON.stringify({
         client_id: '2aqt1ywgapewgs3p',
         client_secret: 'Q6PsRFbE',
         grant_type: 'client_credentials',
         scope : 'emsi_open'
      }),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
     },
    })
    .then(async response => {
        if( response.status === 200 ){
            return response.json();
        } else if(response.status === 400){
            console.log("fail")
            return await response.json();
        
        } else (console.log( await response.json()))
    } )
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
        {addEdFormValues.map((input, index) => {
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
        <Button onClick={AddWorkForm}>Add Work History</Button>
        {addWorkFormValues.map((input, index) => {
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
                <Button onClick={skillsChecker}> load skills</Button>
                <div> 

                </div>
                
            </div>
          )
        })}
        </div>
        
      </div>
    </div>
  );
}

export default AddResume;
