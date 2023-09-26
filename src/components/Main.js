import React from "react";
//import Topics from "./Topics";
import Material from "./Material";
import UpdateTrafficData from "./UpdateTrafficData";



export default function Main(){


    //alert('Main-No: ' + Math.random(1000));
    const [selectedTopicId, setSelectedTopicId] = React.useState("0");
    const [criteriaData, setCriteriaData] = React.useState({
        "selectedLanguage": "-1",
        "selectedAge" : "-1",
        "selectedGrade": "-1",
        "selectedMaterialType": "-1",
        "selectedPurpose": "-1"
    });
    const [allTopics, setAllTopics] = React.useState([]);
    const [refreshPage, setRefreshPage] = React.useState(true);

    var criteriaChanged = false;

    React.useEffect(() => {
        fetch("https://iz4tu2qmv5.execute-api.us-east-2.amazonaws.com/Test/topics")
            .then(response => response.json())
            .then(data => setAllTopics(data.Topics));
            //alert("useEffect-No::" + Math.random(1000));
      },[]);


    const handleCriteriaChange = (e)=>{
        e && e.preventDefault();
        setCriteriaData({
            ...criteriaData,
            [e.target.id]: e.target.value
          });
        criteriaChanged = true;
    };

    const applyCriteria = (e)=>{
        e && e.preventDefault();
        if(criteriaChanged)
        {
            setRefreshPage(!refreshPage);
        }
    };

    return (
    <>
        <div className="mainContainer">
            <h3 htmlFor="topics" >Select a topic to view materials</h3>
            <select 
                name="topics" 
                id="topics" 
                className="selectOption"
                value={selectedTopicId}
                onChange={(e) =>
                    {
                        e && e.preventDefault();
                        const {value} = e.target
                        //update traffic's interests
                        UpdateTrafficData({
                            trafficType: "Topic_Interest",
                            ipAddress: "",
                            latitude: "",
                            longitude: "",
                            accuracy: "",
                            error: "",
                            Message: "Selected topic : " + e.target.options[e.target.selectedIndex].text,
                            browserDetails: ""
                        });
                        setSelectedTopicId(value);
                        //alert("Topic id:" + value)
                    }
                }>
                <option value="defaultSelection" key="0">---Select a topic---</option>
                { allTopics.filter(t => Object.is(t.visibility, undefined) 
                                        || Object.is(t.visibility, null) 
                                        || t.visibility == true).sort((t1, t2) =>{
                    if(t1.topic_type < t2.topic_type) return -1;
                    else if(t1.topic_type > t2.topic_type) return 1;
                    else return 0;
                }).map( topic => <option value={topic.topic_Id} key={topic.topic_Id} >{topic.topic_text}</option>)}
            </select>
            <button 
                type="submit"
                className="submitButton" 
                onClick={(e) =>
                    {
                        e && e.preventDefault();
                        const {value} = e.target
                        setSelectedTopicId(value);
                        setRefreshPage(!refreshPage);
                        console.log(value)
                        return
                    }
                
            }>Get Materials</button>
            
            <div className="selectionBox">
                <h4>Filter conditions</h4>
                <select 
                className="selectionDropdown" 
                id="selectedLanguage"
                value={criteriaData.selectedLanguage}
                onChange={handleCriteriaChange}>
                    <option value="-1">--Select Language---</option>
                    <option value="en-US">English - USA</option>
                    <option value="es-US">Spanish - USA</option>
                    <option value="fr-FR">French - France</option>
                    <option value="pt-BR">Portuguese - Brazil</option>
                </select>
                <select 
                className="selectionDropdown" 
                id="selectedAge"
                value={criteriaData.selectedAge}
                onChange={handleCriteriaChange}>
                    <option value="-1">--Select Age---</option>
                    <option value="5+">5+</option>
                    <option value="8+">8+</option>
                    <option value="teen">Teeneger</option>
                    <option value="adult">Adult</option>
                </select>
                <select 
                className="selectionDropdown" 
                id="selectedGrade"
                value={criteriaData.selectedGrade}
                onChange={handleCriteriaChange}>
                    <option value="-1">--Select Grade---</option>
                    <option value="5+">5th to 8th</option>
                    <option value="8+">8th to 12th</option>
                    <option value="12+">12+</option>
                    <option value="beyond">College and Beyond</option>
                </select>
                <select 
                className="selectionDropdown" 
                id="selectedMaterialType"
                value={criteriaData.selectedMaterialType}
                onChange={handleCriteriaChange}>
                    <option value="-1">--Select Material Types---</option>
                    <option value="text">Text</option>
                    <option value="comic">Comic Version</option>
                    <option value="audio">Audio Only</option>
                    <option value="video">Videos</option>
                    <option value="quiz">Quiz</option>
                    <option value="questionPaper">Question Papers</option>
                </select>
                <select 
                className="selectionDropdown" 
                id="selectedPurpose"
                value={criteriaData.selectedPurpose}
                onChange={handleCriteriaChange}>
                    <option value="-1">--Select Purpose---</option>
                    <option value="leisure">Leisure Reading</option>
                    <option value="knowledge">Knowledge Gain</option>
                    <option value="academic">Academic</option>
                    <option value="research">Research</option>
                </select>
                <button 
                type="submit"
                className="submitButtonShow" 
                disabled
                onClick={applyCriteria}>Apply</button>
            </div> 
            <section className="material--box">
                <Material selectedTopicId={selectedTopicId} 
                    selectedLanguage={criteriaData.selectedLanguage}
                    selectedAge={criteriaData.selectedAge} 
                    selectedGrade={criteriaData.selectedGrade} 
                    selectedMaterialType= {criteriaData.selectedMaterialType} 
                    selectedPurpose={criteriaData.selectedPurpose}>
                </Material>
            </section>
        </div>

    </>    
    )  ;

    
}



