import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import CanvasLoader from '../Loader';

// Error Boundary for Ball
class BallErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Ball texture loading error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-full w-full">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-50 animate-pulse"></div>
        </div>
      )
    }

    return this.props.children
  }
}

const Ball = (props) => {
  try {
    const [decal] = useTexture([props.imgUrl], (textures) => {
      // Texture loaded successfully
      textures.forEach(texture => {
        texture.needsUpdate = true;
      });
    });

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
            flatShading
          />
        </mesh>
      </Float>
    );
  } catch (error) {
    console.error('Error loading texture:', props.imgUrl, error);
    // Return a simple colored sphere as fallback
    return (
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[0,0,0.05]}/>
        <mesh castShadow receiveShadow scale={2.75}>
          <icosahedronGeometry  args={[1,1]} />
          <meshStandardMaterial
            color="#915eff"
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
        </mesh>
      </Float>
    );
  }
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return (
    <BallErrorBoundary>
      <Canvas 
        frameloop="always" 
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: 'default',
          antialias: !isMobile,
          alpha: true
        }}
        dpr={isMobile ? [1, 1] : [1, 2]}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
          />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </BallErrorBoundary>
  );
};

export default BallCanvas;
