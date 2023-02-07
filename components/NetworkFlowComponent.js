import Link from "next/link";
import React, { useEffect } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import { DATA_SERVER_IMAGE_ADDRESS } from "../config";

//Node = [[name,id, imageUrl],...]
//Edges = [[sourceId, targetId, label],...]
export const TestBed = ({ nodeData, edgeData }) => {
  useEffect(() => {}, [nodeData]);
  console.log(nodeData);
  console.log(edgeData);
  console.log("netgraph test");
  let finalNodes = null;
  if (nodeData) {
    let baseDelta = 150;
    let startX = -500;
    let i = 0;
    finalNodes = nodeData.map(entry => {
      i += 1;
      startX += baseDelta;
      return {
        id: entry[1].toString(),

        data: {
          label: (
            <Link href={"/user/admin"}>
              <a>
                {/* {entry[0]} */}
                <img
                  src={DATA_SERVER_IMAGE_ADDRESS + entry[2]}
                  width={50}
                ></img>
              </a>
            </Link>
          )
        },
        position: { x: i == 1 ? 0 : startX, y: i == 1 ? 0 : -150 }
      };
    });
  }
  let finalEdges = null;
  if (edgeData) {
    finalEdges = edgeData.map(entry => {
      return {
        id: entry[0].toString() + "+" + entry[1].toString(),
        source: entry[0].toString(),
        target: entry[1].toString(),
        label: entry[2]
      };
    });
  }
  [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e1-4", source: "1", target: "3" }
  ];

  const initialNodes = [
    {
      id: "1",

      data: { label: "Input Node" },
      position: { x: 250, y: 25 }
    },

    {
      id: "2",
      // you can also pass a React component as a label
      data: {
        label: (
          <div>
            <img
              src={
                "https://content.coedcherry.com/gianna-michaels/mystackedwifewhitestripes01/16.JPG"
              }
              width={150}
            />
            <p>Gianna Micheals</p>
          </div>
        )
      },
      position: { x: 100, y: 125 }
    },
    {
      id: "3",
      //   type: "output",
      data: { label: "Output Node" },
      position: { x: 250, y: 400 }
    }
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e1-4", source: "1", target: "3" }
  ];

  if (nodeData) {
  } else {
    return <p>No flow data provided</p>;
  }
  const rfStyle = {
    backgroundColor: "#D0C0F7"
  };

  return (
    <ReactFlow
      nodes={nodeData ? finalNodes : initialNodes}
      edges={edgeData ? finalEdges : initialEdges}
      fitView
      style={rfStyle}
    >
      <Background />
    </ReactFlow>
  );
};

export function NetworkFlowComponent({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect
}) {
  const rfStyle = {
    backgroundColor: "#D0C0F7"
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      style={rfStyle}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background />
      {/* <MiniMap /> */}
      <Controls />
    </ReactFlow>
  );
}
