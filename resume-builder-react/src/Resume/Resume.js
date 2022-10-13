import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Colors } from "react-foundation";
import './Resume.css'

function Resume(props) {

  const [isOpen, setIsOpen] = useState(false);

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
    // <tr>
    //   <td>{1}</td>
    //   <td>
    //   {"data"}
    //   </td>
    //   <td className="publicButton">
    //     <div className="switch">
    //       <input
    //         className="switch-input"
    //         id="exampleSwitch"
    //         type="checkbox"
    //         name="exampleSwitch"
    //       />
    //       <label className="switch-paddle" htmlFor="exampleSwitch">
    //         <span className="show-for-sr">Download Kittens</span>
    //       </label>
    //     </div>
    //   </td>

    //   <td><Button color={Colors.ALERT}>Delete</Button> </td>
    // </tr>
  // );
      <div >
        <motion.div onClick={() => setIsOpen(!isOpen)} className="card">
          <motion.h2>Resume {props.resumeId}</motion.h2>
          {isOpen &&
          <motion.div>
            <p>some text goes here</p>
          </motion.div>
          }
        </motion.div>
      </div>
  )

}

export default Resume;
