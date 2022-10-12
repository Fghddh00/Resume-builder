import { Button, Colors } from "react-foundation";

function Resume(props) {
  function deleteClicked() {
    if (
      window.confirm(
        "Are you sure you want to delete " + props.resumeData.resumeId + "?"
      )
    ) {
      fetch("http://localhost:8080/resume" + props.resumeData.resumeId, {
        method: "DELETE",
      }).then((response) => {
        if (response.status === 204) {
          props.onResumeDeleted();
        } else {
          console.log(response.json());
        }
      });
    }
  }

  return (
    <tr>
      <td>Content Goes Here</td>
      <td>
      {props.resumeData}
      </td>
      <td className="publicButton">
        <div className="switch">
          <input
            className="switch-input"
            id="exampleSwitch"
            type="checkbox"
            name="exampleSwitch"
          />
          <label className="switch-paddle" htmlFor="exampleSwitch">
            <span className="show-for-sr">Download Kittens</span>
          </label>
        </div>
      </td>

      <td><Button color={Colors.ALERT}>Delete</Button> </td>
    </tr>
  );
}

export default Resume;
