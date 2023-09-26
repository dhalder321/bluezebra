import { useEffect, useState } from "react";
import UpdateTrafficData from "./UpdateTrafficData";

function TrafficDetails() {

  const [trafficData, setTrafficData] = useState({
        trafficType: "first_landing",
        ipAddress: "",
        latitude: "",
        longitude: "",
        accuracy: "",
        error: "",
        browserDetails: ""
  });
  
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
    function success(pos) {
      var crd = pos.coords;
      setTrafficData({
              ...trafficData,
              latitude: crd.latitude,
              longitude: crd.longitude,
              accuracy: "More or less within " + crd.accuracy + " meters",
      });
      // alert("in success method: " + JSON.stringify(trafficData));
      UpdateTrafficData(trafficData);
    }
  
    function errors(err) {
      setTrafficData({
        ...trafficData,
        latitude: "error",
        longitude: "error",
        accuracy: "",
        error: "ERROR::" + err.code + ":" + err.message
      });
      UpdateTrafficData(trafficData);
    }

    useEffect(() => {

        const fetchIp = async () => {
          try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            setTrafficData({
              ...trafficData,
              ipAddress: data.ip
            });
          } catch (error) {
            console.error(error);
          }
        };
        fetchIp();
        //alert("IP:" + trafficData.ipAddress);
      
        //const userAgent = window.navigator.userAgent;
        setTrafficData({
          ...trafficData,
          browserDetails: "" + window.navigator.userAgent + ""
        });
        //alert("browser details:" + trafficData.browserDetails);

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

      return <div className="noDisplayBox"></div>;
    }

export default TrafficDetails;