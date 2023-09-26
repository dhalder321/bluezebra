import React from "react";
import axios from "axios";
import FormModal from "./FormModal";

import downloadIcon from "../assets/images/download-icon.png"
import customize from "../assets/images/customize.png"
import addNew from "../assets/images/add-new-materials.png"
import requestModification from "../assets/images/request-modification.png"

export default function Material(selectedTopic) {

    const [allMaterials, setAllMaterials] = React.useState([]);

    //form modal pop-up
    const showModal = React.useRef(false);
    const formModalKeyMaterials = React.useRef(1);
    const [refresh, setRefresh] = React.useState(false);

    const currencyFormat = (value) =>
                            new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(value);
    

    const downloadArtifact = (url, fileName) => {

        fetch(url)
        .then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = fileName;
                alink.click();
            })
        })
        
    }      

    React.useEffect(() => {
        fetch("https://iz4tu2qmv5.execute-api.us-east-2.amazonaws.com/Test/materials?TopicId=" + selectedTopic.selectedTopicId)
            .then(response => response.json())
            .then(data => setAllMaterials(data.Materials));
        
        },[selectedTopic.selectedTopicId]);

    let materialContent;

    
    //filter the materials
    var filteredMaterials = [];
    // filteredMaterials = selectedTopic && selectedTopic.selectedLanguage != "-1" 
    //                                 && allMaterials.filter(m => m.artifacts.includes
    //                                     (a => a.locale_code.toLowerCase() === selectedTopic.selectedLanguage.toLowerCase()));
    //filter the artifacts                                        
    // filteredMaterials = filteredMaterials && filteredMaterials.length > 0 
    //             && filteredMaterials.forEach(m =>{
    //             m.artifacts = m.artifacts.filter(a => a.locale_code.toLowerCase() === selectedTopic.selectedLanguage.toLowerCase())
    // });
    //filter the 
    // allMaterials = selectedTopic && selectedTopic.selectedAge != "-1" 
    //                                 && allMaterials.filter(m => m.locale_code.toLowerCase() === selectedTopic.selectedLanguage.toLowerCase());                                    
    
    //alert(JSON.stringify(allMaterials));
    const sortedMaterials = allMaterials && allMaterials.length > 0 
            && allMaterials.sort(
            (m1, m2) => (m1.price < m2.price)? -1: (m1.price > m2.price)? 1 : 0
    );
    
    materialContent = sortedMaterials.length > 0? 
                        sortedMaterials.map(material => 
                            <section className="material--item" key={material.material_id}>
                                <div className="materialHeading">{material.material_name}</div>
                                <div className="iconContainer">
                                <img src={requestModification} className="disabledIcon"></img> 
                                <img src={addNew} className="disabledIcon"></img> 
                                <img src={customize} className="disabledIcon"></img> 
                                <a href= "">
                                <img src={downloadIcon} className="material-icons md-25" onClick={async (e)=>{

                                        e && e.preventDefault();
                                        let name, path, enusArtifact;
                                        if(material.artifacts && material.artifacts.length > 0 )
                                        {
                                            enusArtifact = material.artifacts.find(a => a.locale_code === "en-us");
                                            if(enusArtifact)
                                            {
                                                name = enusArtifact.artifact_name;
                                                path = enusArtifact.bucket_path;
                                            }
                                        }
                                        //alert(name + "::" + path);
                                        if (Number.isFinite(material.price) 
                                                && Number.parseFloat(material.price) <= 0 && name && path)
                                            {
                                                const params = {
                                                    bucket_name:"fundu-document-repository",
                                                    bucket_path: path,
                                                    file_name: name
                                                }
                                                const response =  await axios.post("https://iz4tu2qmv5.execute-api.us-east-2.amazonaws.com/Test/artifacts",
                                                                                    params);
                                                const {SignedURL} = response.data;
                                                //alert(JSON.stringify(SignedURL));
                                                downloadArtifact(SignedURL, name);
                                            }
                                        else
                                        {
                                            formModalKeyMaterials.current = formModalKeyMaterials.current + 1;
                                            showModal.current = true;
                                            setRefresh(!refresh);
                                        }
                                }}></img></a></div>
                                <span className="material--info">
                                <b>Difficulty:</b> {material.difficultyLevel.toUpperCase()} <space/><space/>
                                <b>Grade level:</b> {material.gradeLevel.toUpperCase()} <space/><space/>
                                <b>Word count:</b> {material.noOfWords} <space/><space/>
                                <b>Price:</b> {Number.isFinite(material.price)? 
                                                    Number.parseFloat(material.price) <= 0? 
                                                                    "Free": currencyFormat(material.price) 
                                                    : material.price} 
                                </span> 
                                
                            </section>    
    ) 
    : materialContent

    return (
        <>
            <div>
                { materialContent ? materialContent :  <span>Zebra team is working on adding these materials.</span>}
            </div>
            {showModal.current && <FormModal showModal={true} key={formModalKeyMaterials.current}
            text="Requested material is not accessible due to high number of requests. Zebra team is continually working on making these materials available to you. Please share your requirements and feedback to improve our service."></FormModal>}
        </>
    );
}

