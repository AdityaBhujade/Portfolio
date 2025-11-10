import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import CanvasLoader from '../Loader';
import { ErrorBoundary } from 'react-error-boundary';  // Import from react-error-boundary

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0,0,0.05]}/>
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry  args={[1,1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
        position={[0,0,1]}
        rotation={[2*Math.PI, 0,6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas 
      frameloop="demand" 
      gl={{ 
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        alpha: true
      }}
      dpr={[1, 2]}
    >
      <ErrorBoundary FallbackComponent={<h2>Something went wrong.</h2>}>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
          />
          <Ball imgUrl={icon} />
        </Suspense>
      </ErrorBoundary>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
