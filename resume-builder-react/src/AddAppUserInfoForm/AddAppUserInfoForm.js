import FormInput from "../FormInput/FormInput";


function AddAppUserInfoForm({appUserInfo, onAppUserInfoUpdated, index}){
    function updateAppUserInfo(evt){
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const copy = {...appUserInfo};
        copy[name] = value;

        onAppUserInfoUpdated(copy,index);
    }
    // private String email;
    // private String firstName;
    // private String lastName;
    // private String address;
    // private String phoneNumber;

    return(
        <div key={index} className="form">

        <FormInput
          inputType={"text"}
          identifier={"email"}
          labelText={"Email"}
          currVal={appUserInfo.email}
          onChangeHandler={updateAppUserInfo}
        />
        <FormInput
          inputType={"text"}
          identifier={"firstName"}
          labelText={"First Name"}
          currVal={appUserInfo.firstName}
          onChangeHandler={updateAppUserInfo}
        />
        <FormInput
          inputType={"text"}
          identifier={"lastName"}
          labelText={"Last Name"}
          currVal={appUserInfo.lastName}
          onChangeHandler={updateAppUserInfo}
        />
        <FormInput
          inputType={"text"}
          identifier={"address"}
          labelText={"Addrress"}
          currVal={appUserInfo.address}
          onChangeHandler={updateAppUserInfo}
        />
        <FormInput
          inputType={"text"}
          identifier={"phoneNumber"}
          labelText={"Phone Number"}
          currVal={appUserInfo.phoneNumber}
          onChangeHandler={updateAppUserInfo}
        />
      </div>

    );
}

export default AddAppUserInfoForm;