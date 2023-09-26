import { useEffect, useState } from "react";
import axios from "axios";


function TrafficDetails() {

  const [ipAddress, setIpAddress] = useState("");
  const [userAgent, setUserAgent] = useState("");
  
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
    var traffic = {};

    function success(pos) {
      var crd = pos.coords;
      // console.log("Your current position is:");
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log(`More or less ${crd.accuracy} meters.`);
      traffic = {
              "IPAddress": ipAddress,
              "latitude": crd.latitude,
              "longitude": crd.longitude,
              "accuracy": "More or less" + crd.accuracy + "meters",
              "browserDetails": userAgent
      }
    }
  
    function errors(err) {
      traffic = {
        "IPAddress": ipAddress,
        "latitude": "error",
        "longitude": "error",
        "accuracy": "",
        "error": "ERROR::" + err.code + ":" + err.message,
        "browserDetails": userAgent
      }
      //console.warn(`ERROR(${err.code}): ${err.message}`);
    }

      useEffect(() => {
        const fetchIp = async () => {
          try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            setIpAddress(data.ip);
          } catch (error) {
            console.error(error);
          }
        };
        fetchIp();
      }, []);
    
      useEffect(() => {
        const userAgent = window.navigator.userAgent;
        setUserAgent(userAgent);
    }, []);
    
      useEffect(() => {
        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              console.log(result);
              if (result.state === "granted") {
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "prompt") {
                //If prompt then the user will be asked to give permission
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
              }
            });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }, []);

      useEffect(() =>{
          axios.post("https://iz4tu2qmv5.execute-api.us-east-2.amazonaws.com/Test/traffic", traffic)
          .then((res) =>{
              console.log("successfully stored the traffic details.")
          }).catch((err) =>{
            console.log("error storing the traffic details.")
          });
      }, [])
      
      return <div className="noDisplayBox"></div>;
    }

export default TrafficDetails;