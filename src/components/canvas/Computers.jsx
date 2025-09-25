import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children; 
  }
}

const Computers = ({ ismobile }) => {
  const { scene } = useGLTF('./desktop_pc/scene.gltf');
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={scene}
        scale={ismobile ? 0.65 : 0.7}
        position={ismobile ? [0, -3, -2.2]:[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  //add a listener for changes to the screen size 
  const [ismobile,setismobile] = useState(false);
  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width: 400px)');
    //set the initial value of the 'ismobile' state variable to the result of the media query
    setismobile(mediaQuery.matches);
    //define a callback function to handle changes to the media query
    const handleMediaquery = (event) =>{
      setismobile(event.matches);
    }

    mediaQuery.addEventListener('change',handleMediaquery);
    return ()=>{
      mediaQuery.removeEventListener('change',handleMediaquery);
    }
  },[])
  return (
    <Canvas frameloop='demand' shadows camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <ErrorBoundary>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <Computers ismobile={ismobile}/>
        </Suspense>
      </ErrorBoundary>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
