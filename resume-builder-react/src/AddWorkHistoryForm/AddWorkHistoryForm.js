import FormInput from "../FormInput/FormInput";

function AddWorkHistoryForm({workHistory, onWorkHistoryUpdated, index}){
    function updateWorkHistory(evt){
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const copy = {...workHistory};
        copy[name] = value;

        onWorkHistoryUpdated(copy,index);
    }

    return(
        
            <div key={index} className="form">
              <FormInput
                inputType={"text"}
                identifier={"jobTitle"}
                labelText={"Job Title"}
                currVal={workHistory.jobTitle}
                onChangeHandler={updateWorkHistory}
              />
              <FormInput
                inputType={"date"}
                identifier={"startDate"}
                labelText={"Start Date"}
                currVal={workHistory.startDate}
                onChangeHandler={updateWorkHistory}
              />
                <FormInput
                inputType={"date"}
                identifier={"endDate"}
                labelText={"End Date"}
                currVal={workHistory.endDate}
                onChangeHandler={updateWorkHistory}
              />
                <textarea
                inputType={"text"}
                identifier={"jobDescription"}
                labelText={"Job Description"}
                currVal={workHistory.jobDescription}
                onChangeHandler={updateWorkHistory}
              />
            </div>
          );
}

export default AddWorkHistoryForm;