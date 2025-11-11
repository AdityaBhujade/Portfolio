import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          metalness={0.1}
          roughness={0.5}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

// Error Boundary for Ball
class BallErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Ball rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={this.props.icon} 
            alt="tech" 
            className="w-16 h-16 object-contain"
            style={{ filter: 'drop-shadow(0 0 10px rgba(145, 94, 255, 0.5))' }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Check for mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
      }
    } catch (e) {
      setIsWebGLSupported(false);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // Fallback for no WebGL support
  if (!isWebGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={icon} 
          alt="tech" 
          className="w-16 h-16 object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(145, 94, 255, 0.5))' }}
        />
      </div>
    );
  }

  return (
    <BallErrorBoundary icon={icon}>
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
          />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </BallErrorBoundary>
  );
};

export default BallCanvas;
