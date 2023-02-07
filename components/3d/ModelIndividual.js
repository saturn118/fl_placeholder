import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";


const BONE_ID = {
  head: "5",
  shoulderLeft: "10",
  shoulderRight: "34",
  footLeft: "59",
  footRight: "64",
  elbowLeft: "10",
  elbowRight: "34",
  wristLeft: "12",
  wristRight: "36",
  neck: "4",
  kneeLeft: "58",
  kneeRight: "63",
  hipLeft: "57",
  hipRight: "62",
  handRight: "36",
  handLeft: "12"
};

//Skeleton can be retrieved via myMesh.current.skeleton
function GetBoneWorldPosition(boneId, skeleton) {
  let boneIndex = BONE_ID[boneId];
  const pos = new THREE.Vector3();

  skeleton.bones[boneIndex].getWorldPosition(pos);
  return pos;
}

export default function ModelIndividual({
  invisible = false,
  showTime = false,
  initialPlay = false,
  replayHack = null,
  animationToPlay = null,
  startAnimTime = null,
  stopAnimTime = null,
  animSpeed = 1.0,
  customColour = "Red",
  position = [0, 0, 0],
  flip = false,
  transparent = false,
  loop = false,
  updateAnimTime = null,
  playbackSpeed = 1,
  model = "/dummy_female.glb",
  ...props
}) {
  const group = React.useRef();
  const { scene, materials } = useGLTF(model);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { animations } = useGLTF(animationToPlay);
  const { actions, names } = useAnimations(animations, group);
  const [currentAnimTime, setCurrentAnimTime] = useState(null);
  const [scaleFlip, setScaleFlip] = useState(1.0);
  const [hovered, setHovered] = useState(false);
  const [hidden, set] = useState();
  const [isPlayingAnim, setIsPlayingAnim] = useState(false);
  const [bonePosition, setBonePosition] = useState(null);

  const myMesh = React.useRef();
  const myMesh2 = React.useRef();

  useEffect(() => {
    setScaleFlip(flip ? -1.0 : 1.0);
  }, [flip]);

  useEffect(() => {
    if (startAnimTime != null && stopAnimTime != null) {
      if (actions && names && names[0]) {
        let currentAction = actions[names[0]];
        currentAction.time = startAnimTime;
        currentAction.timeScale = animSpeed;
      }
    }
  }, [startAnimTime, stopAnimTime, replayHack, animSpeed]);

  useEffect(() => {
    if (animationToPlay) {
      if (actions && names && names[0]) {
        let currentAction = actions[names[0]];
        currentAction.timeScale = playbackSpeed;
      }
    }
  }, [playbackSpeed]);

  useEffect(() => {
    //  const { animations } = useGLTF(animationToPlay);
    if (animationToPlay) {
      if (actions && names && names[0]) {
        let currentAction = actions[names[0]];

        if ((startAnimTime || startAnimTime > 0) && stopAnimTime) {
          currentAction.time = startAnimTime;
          currentAction.timeScale = animSpeed;
        } else {
          if (loop == false) {
            currentAction.clampWhenFinished = true;
            currentAction.repetitions = 1;

            let mixer = currentAction.getMixer();
          }
          currentAction.timeScale = playbackSpeed;
        }

        currentAction.play();
        setIsPlayingAnim(true);
        if (initialPlay == false) {
          currentAction.timeScale = 0;
        }
      }
    }
  }, [animationToPlay, initialPlay]);

  function refreshTransparency() {
    if (myMesh.current && myMesh2.current) {
      myMesh.current.material.transparent = transparent;
      myMesh2.current.material.transparent = transparent;
      if (transparent) {
        myMesh.current.material.opacity = 0.25;
        myMesh2.current.material.opacity = 0.25;
      } else {
        myMesh.current.material.opacity = 1;
        myMesh2.current.material.opacity = 1;
      }
    }
  }

  useEffect(() => {
    refreshTransparency();
  }, []);

  useEffect(() => {
    refreshTransparency();
  }, [transparent]);

  useFrame(({ clock }) => {
    if (myMesh2 && myMesh2.current) {
      if (actions && names && names[0]) {
        let animClip = actions[names[0]];
        if (showTime) {
          setCurrentAnimTime(animClip.time.toFixed(2));
        }

        if ((startAnimTime || startAnimTime >= -1.0) && stopAnimTime) {
          // if (animClip.isRunning) {
          let currentAnimTime = animClip.time;
          if (currentAnimTime >= stopAnimTime) {
            animClip.time = stopAnimTime;
            animClip.timeScale = 0.0;
          }
          // }
        }
      }
    }
  });

  let bodyColour = hovered ? "Yellow" : customColour;

  if (invisible) {
    return <></>;
  }

  return (
    <>
      <group {...props} ref={group} dispose={null}>
        <group
          name="Armature"
          position={position}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.01, scaleFlip * 0.01, 0.01]}
          receiveShadow
          transparent={transparent}
          castShadow={!transparent}
          onPointerOver={() => {
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}

          // onClick={() => setIndex((index + 1) % names.length)}
        >
          <primitive object={nodes.mixamorigHips} />
          {/* Joints */}
          <skinnedMesh
            ref={myMesh}
            castShadow={!transparent}
            receiveShadow
            geometry={nodes.Beta_Joints.geometry}
            material={materials.Beta_Joints_MAT}
            // material-color={jointColour}
            skeleton={nodes.Beta_Joints.skeleton}
          >
            <meshStandardMaterial
              color={transparent ? customColour : "Black"}
            />
          </skinnedMesh>
          {/* Body */}
          <skinnedMesh
            ref={myMesh2}
            castShadow={!transparent}
            receiveShadow
            // receiveShadow
            geometry={nodes.Beta_Surface.geometry}
            // material={materials["asdf1:Beta_HighLimbsGeoSG2"]}
            // material-color={customColour}
            skeleton={nodes.Beta_Surface.skeleton}
          >
            <meshPhysicalMaterial
              emissive={bodyColour}
              emissiveIntensity={0.2}
              color={bodyColour}
              metalness={0.5}
              roughness={1}
              reflectivity={0}
            />
          </skinnedMesh>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/dummy_female.glb");
