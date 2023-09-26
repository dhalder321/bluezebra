import axios from "axios";


export default function UpdateTrafficData(trafficData){

    // alert("In update method::" +JSON.stringify(trafficData));
      axios.post("https://iz4tu2qmv5.execute-api.us-east-2.amazonaws.com/Test/traffic", trafficData)
      .then((res) =>{
          console.log("successfully stored the traffic details.")
      }).catch((err) =>{
        console.log("error storing the traffic details.")
      });

  }; 