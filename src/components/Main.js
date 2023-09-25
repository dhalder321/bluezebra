import React from "react";
//import Topics from "./Topics";
import Material from "./Material";


export default function Main(){


    //alert('Main-No: ' + Math.random(1000));
    const [selectedTopicId, setSelectedTopicId] = React.useState("0");
    const [allTopics, setAllTopics] = React.useState([]);


    React.useEffect(() => {
        fetch("https://iz4tu2qmv5.execute-api.us-east-2.amazonaws.com/Test/topics")
            .then(response => response.json())
            .then(data => setAllTopics(data.Topics));
            //alert("useEffect-No::" + Math.random(1000));
      },[]);

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
                        const {value} = e.target
                        setSelectedTopicId(value);
                        console.log(value)
                        return
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
                        const {value} = e.target
                        setSelectedTopicId(value);
                        console.log(value)
                        return
                    }
                
            }>Get Materials</button>
            
            <div className="selectionBox">
                <h4> Filter conditions</h4>
                <select className="selectionDropdown">
                    <option>--Select Language---</option>
                    <option>English - USA</option>
                    <option>Spanish - USA</option>
                    <option>French - France</option>
                    <option>Portuguese - Brazil</option>
                </select>
                <select className="selectionDropdown">
                    <option>--Select Age---</option>
                    <option>5+</option>
                    <option>8+</option>
                    <option>12+</option>
                    <option>Adult</option>
                </select>
                <select className="selectionDropdown">
                    <option>--Select Grade---</option>
                    <option>5th to 8th</option>
                    <option>8th to 12th</option>
                    <option>12+</option>
                    <option>College and Beyond</option>
                </select>
                <select className="selectionDropdown">
                    <option>--Select Material Types---</option>
                    <option>Text</option>
                    <option>Comic Version</option>
                    <option>Audio Only</option>
                    <option>Videos</option>
                    <option>Quiz</option>
                    <option>Question Papers</option>
                </select>
                <select className="selectionDropdown">
                    <option>--Select Purpose---</option>
                    <option>Leisure Reading</option>
                    <option>Knowledge Gain</option>
                    <option>Academic</option>
                    <option>Research</option>
                </select>
            </div> 
            <section className="material--box">
                <Material selectedTopicId={selectedTopicId}></Material>
            </section>
        </div>

    </>    
    )  ;

    
}



