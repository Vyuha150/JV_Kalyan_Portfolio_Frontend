import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 100, 200]} />
        <MeshDistortMaterial
          color="#60a5fa"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const MeshBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};

export default MeshBackground;