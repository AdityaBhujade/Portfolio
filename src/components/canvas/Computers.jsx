import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

// Error Boundary Component
class ComputerErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Computer model error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="text-white text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 animate-pulse"></div>
            <p>3D Model Loading...</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={isMobile ? 0.5 : 0.15} groundColor='black' />
      <ambientLight intensity={isMobile ? 0.3 : 0.15} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobile ? 1.5 : 1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[10, 10, 10]} intensity={isMobile ? 0.8 : 0.5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

// Preload the model
useGLTF.preload('./desktop_pc/scene.gltf')

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches)

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setIsWebGLSupported(false)
      }
    } catch (e) {
      setIsWebGLSupported(false)
    }

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  // Fallback for no WebGL support
  if (!isWebGLSupported) {
    return (
      <div className="flex justify-center items-center h-full" style={{ backgroundColor: '#050816' }}>
        <div className="text-white text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 animate-pulse"></div>
          <p>Loading Experience...</p>
        </div>
      </div>
    )
  }

  return (
    <ComputerErrorBoundary>
      <Canvas
        frameloop='always'
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          antialias: !isMobile,
          alpha: true,
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </ComputerErrorBoundary>
  )
}

export default ComputersCanvas;
