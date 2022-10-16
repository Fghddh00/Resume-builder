import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";

function viewFullResume(props) {

    const userData = useContext(AuthContext);
    const history = useHistory();

    useEffect( () => {
        if( userData === null ){
            history.push( "/login" );
        } else {
            const userId = userData.claims.jti;
            const jwt = userData.jwt;
          fetch( "http://localhost:8080/api/resume/" + 1,
          //props.id
          {headers: {
            Authorization: `Bearer ${jwt}`
          }
           })
          .then(async response => {
              if( response.status === 200 ){
                  return response.json();
              } else if(response.status === 400){
                  setIsEmpty(true);
                  return response.json();
              
              } else (console.log( await response.json()))
          } )
          .then( resumeInfo => {
              console.log(resumeInfo); //just to see what we get
          });
      }
    });


}

export default viewFullResume;