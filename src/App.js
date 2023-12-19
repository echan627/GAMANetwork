import "./styles.css";
import React, { useCallback, useState, useRef } from 'react';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
import 'react-dropdown/style.css';
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR
} from "react-force-graph";
//import data from './networkdata1.json';
import Papa from "papaparse";
import GraphData from "./GraphData";


export default function App() {
  const { useRef } = React;  

  const [file, setFile] = useState(''); // storing the uploaded file  
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');  
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({nodes:[], links:[]});
  const [links, setLinks] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [dp, setDp] = useState("flex");

  const ModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: '250px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const GraphStyles = {
    content: {
      height: '700px',
      width: '99%',
    },
  };

  function handleParse(file) {
     
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return alert("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, {
            header: true,
        });
        const parsedData = csv?.data;
        setOptions(Object.keys(parsedData[0]));
    };
    reader.readAsText(file);
  };

  // On file select (from the pop up)
  const onFileChange = async event => {
    // Update the state
    setFile(event.target.files[0]);
    handleParse(event.target.files[0])
  };

  const onFileUpload = () => {
    setIsOpen(false);
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object  
    formData.append('file', file); // appending file

    // Request made to the backend api
    // Send formData object

    setLoading(true);
    axios.post("http://127.0.0.1:8000/networkx?source=" + source + "&target=" + target, formData)
    .then(res => {
      const resData = JSON.parse(res.data);
      setLinks(JSON.parse(JSON.stringify(resData.links)))
      setNodes(JSON.parse(JSON.stringify(resData.nodes)))
      setRankings(resData.rankings)
      setData(resData);
      setLoading(false);
      setDp('none')
      //setRankings(res.data.rankings);
      //setHeaders(Object.keys(res.data.rankings[0]));
    }).catch(err => console.log(err))
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSourceSelected = async event => {
    // Update the source
    setSource(event.value)
  };

  const onTargetSelected = async event => {
    // Update the target
    setTarget(event.value)
  };

  const CameraOrbit = () => {
    const fgRef = useRef();


    return (
      <div>
        <button onClick={openModal} style={{ marginBottom: "10px", fontSize: "15px"  }}>Upload file</button>
        <div style={{display: dp,  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <TailSpin
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loading}
        />
        </div>
        <GraphData nodes={nodes} links={links} rankings={rankings}></GraphData>

          <ForceGraph3D
            id="3d-graph"
            width="100%"
            height="300px"
            ref={fgRef}
            graphData={data}
            nodeAutoColorBy="group"
            nodeVal="degree"
            linkDirectionalParticleColor={() => "red"}
            linkDirectionalParticleWidth={6}
            linkHoverPrecision={10}
            onNodeDragEnd={(node) => {
              node.fx = node.x;
              node.fy = node.y;
              node.fz = node.z;
            }}
            onLinkClick={(link) => fgRef.current.emitParticle(link)}
          />

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={ModalStyles}
          contentLabel="Example Modal"
          appElement={document.getElementById('root')}
        >
        
          <input type="file" onChange={onFileChange} /> 
          <div style={{ marginTop: "10px", marginBottom: "10px", fontSize: "15px"  }}>
            <form>
              <Dropdown options={options} onChange={onSourceSelected} value={source}  placeholder="Select source" />
              <div style={{ marginTop: "10px" }}></div>
              <Dropdown options={options} onChange={onTargetSelected} value={target} placeholder="Select target" />
            </form>
          </div>   
          <button onClick={onFileUpload} className="upbutton">                   
              Upload
          </button>
          
        </Modal>
      </div>
    );
  };


  return (
    <div className="App">
      <h1>GAMA Beta</h1>
      <CameraOrbit />
    </div>
  );
}
