import React from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

// Error Boundary for Earth Model
class EarthErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Earth model error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-full w-full bg-tertiary rounded-2xl">
          <div className="text-white text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full opacity-50 animate-pulse"></div>
            <p>Earth Model Loading...</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf')
  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0}/>
  )
}

// Preload the Earth model
useGLTF.preload('./planet/scene.gltf')

const EarthCanvas = ()=>{
  return(
    <EarthErrorBoundary>
      <Canvas 
        shadows 
        frameloop='demand' 
        dpr={[1, 2]}
        gl={{preserveDrawingBuffer:true}} 
        camera={{fov:45,near:0.1,far:200,position:[-4,3,6]}}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={<CanvasLoader/>}>
          <OrbitControls autoRotate
          enableZoom={false} maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/2} />
          <Earth />
        </Suspense>
        <Preload all />
      </Canvas>
    </EarthErrorBoundary>
  )
}

export default EarthCanvas