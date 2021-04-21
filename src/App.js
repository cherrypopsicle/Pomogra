// react imports
import React, { useEffect, useState } from "react";

// aframe imports
import "aframe";
import { Entity, Scene } from "aframe-react";

// eth imports
// import web3 from "./ethereum/web3";
import pomogra from "./ethereum/pomogra";

const App = () => {
  // chain state
  const [chain, setChain] = useState([]);
  useEffect(() => {
    const getContract = async () => {
      const chain = await pomogra.methods.chain().call();
      setChain(chain);
    };
    getContract();
  }, []);

  const handleClick = () => {
    console.log("clicked");
  };

  const returnChain = chain.map((paper, index) => {
    const message = paper.message;
    const owner = paper.owner;
    const paperType = paper.paperType;

    // if the index is even, rotate x by 90 degrees
    let position = `${index / 5}, 1, 0`;
    let rotation;
    index % 2 === 0 ? (rotation = "-90 0 0") : (rotation = "0 0 0");
    const animationOptions = `startEvents: mouseleave; property: rotation; dur: 1000; from: 0 0 0; to: ${rotation}; dir: normal; easing: linear; loop: false;`;
    return (
      <a-entity
        key={index}
        position={position}
        rotation={rotation}
        geometry="primitive: torus; radius: 0.125; radiusTubular: 0.010"
        animation="startEvents: mouseenter; property: rotation; dur: 1000; from: 0 0 0; to: 0 360 0; dir: normal; easing: linear; loop: true;"
        animation__back={animationOptions}
      >
        {/* <Entity
          position="0 .225 0"
          text={{ value: message }}
          geometry="primitive: plane; width: 1.030; height: 0.100;"
        /> */}
      </a-entity>
    );
  });
  return (
    <Scene>
      <a-camera>
        <a-cursor
          events={{
            mouseenter: () => {
              handleClick();
            },
          }}
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.2 0.2 0.2; to: 1 1 1"
          // animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.2 0.2 0.2"
          // animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"
          cursor="fuse: true; fuseTimeout: 1"
          material="color: #ffffff"
        ></a-cursor>
      </a-camera>
      <Entity
        geometry="primitive: plane; width: 10; height: 10"
        position="0 0 -4"
        rotation="-90 0 0"
        material="color: #7BC8A4"
      />
      {returnChain}
    </Scene>
  );
};

export default App;
