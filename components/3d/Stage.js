import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import * as THREE from "three";



export default function Stage({
  autoOrbit = false,
  overridingCamera = false,
  podium = true,
  wall = false,
  children,
  ...props
}) {
  // const { camera } = useThree();

  const circleSteps = 9;
  let circleStepsElements = [];
  for (let i = 0; i < circleSteps; i++) {
    let t = i * ((3.141 * 2) / circleSteps);

    circleStepsElements.push(
      <>
        <CircleTest
          position={[Math.sin(t) * 3, 0, Math.cos(t) * 3]}
          scale={[0.1, 0.01, 0.1]}
        />
        <CircleTest
          position={[Math.sin(t) * 3, 0.005, Math.cos(t) * 3]}
          scale={[0.07, 0.01, 0.07]}
          color={"white"}
        />
      </>
    );
  }

  let wallElement = null;
  if (wall) {
    wallElement = (
      <mesh receiveShadow position={[0, 1.0, -0.5]}>
        <boxBufferGeometry attach="geometry" args={[1, 1.7, 0.1]} />
        <meshLambertMaterial
          opacity={0.9}
          transparent={true}
          attach="material"
          shadows={true}
          // receiveShadow={true}
          // castShadow={true}
          color={"Gray"}
        />
      </mesh>
    );
  }

  let podiumElements = null;
  if (podium) {
    podiumElements = (
      <>
        {circleStepsElements}

        <mesh receiveShadow castShadow position={[0, 0.1, 0]}>
          <cylinderBufferGeometry
            attach="geometry"
            args={[2.1, 2.1, 0.15, 60, 1]}
          />
          <meshLambertMaterial
            attach="material"
            shadows={true}
            receiveShadow={true}
            castShadow={true}
            color={"Gray"}
          />
        </mesh>

        <mesh receiveShadow castShadow>
          <cylinderBufferGeometry
            attach="geometry"
            args={[2.5, 2.5, 0.05, 60, 1]}
          />
          <meshLambertMaterial
            shadows={true}
            receiveShadow={true}
            color={"Gray"}
          />
        </mesh>
        <mesh
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeBufferGeometry args={[20, 20, 1, 1]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </>
    );
  } else {
    podiumElements = (
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, 0.2, 0]}
        receiveShadow
      >
        <planeBufferGeometry args={[20, 20, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    );
  }

  return (
    <Canvas
      className="stageWindow"
      shadows
      dpr={[1, 2]}
      // camera={{ position: [0, 15, 30], fov: 70 }}
      onClick={e => {
        console.log("Canvas click");
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ReinhardToneMapping;
        // gl.toneMappingExposure = 2;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      {/* <color attach="background" args={["black"]} /> */}
      <Suspense fallback={null}>
        {/* <fog attach="fog" args={[0xfff0ea, 10, 60]} /> */}
        <ambientLight />
        <directionalLight
          position={[0, 10, 4]}
          intensity={4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* <Bounds fit clip observe margin={1.2}> */}
        <group position={[0, -1, 0]}>
          {podiumElements}
          {wallElement}

          <ContactShadows
            frames={1}
            position={[0, -0.05, 0]}
            scale={20}
            opacity={0.18}
            far={1}
            blur={2}
          />

          {children}
        </group>
        {/* </Bounds> */}
      </Suspense>
      {overridingCamera == false && (
        <OrbitControls
          makeDefault
          autoRotate={autoOrbit}
          autoRotateSpeed={2}
          enablePan={true}
          enableZoom={true}
          minDistance={0}
          maxDistance={10}
          maxPolarAngle={3.141 * 0.45}
        />
      )}
    </Canvas>
  );
}

function CircleTest({ color = "Gray", ...props }) {
  const myMesh = React.useRef();
  return (
    <mesh {...props} ref={myMesh}>
      <sphereBufferGeometry attach="geometry" />
      <meshLambertMaterial receiveShadow={true} color={color} />
    </mesh>
  );
}
