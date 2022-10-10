// import { Link } from "react-router-dom";
import {Button, Link, MediaObject, MediaObjectSection, Thumbnail} from "react-foundation";


function Homepage(){
    return (

        <div className="button-basics-example">
            <MediaObject>
    <MediaObjectSection >
      <Thumbnail src="public\photos\man-sitting.jpg"/>
    </MediaObjectSection>
    {/* <MediaObjectSection isMain>
      <h4>Dreams feel real while we're in them.</h4>
      <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
    </MediaObjectSection> */}
  </MediaObject>


        </div>
    )
}

export default Homepage;