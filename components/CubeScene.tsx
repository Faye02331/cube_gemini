
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface RotatingCubeProps {
  scrollProgress: number;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create edges for that "wireframe-ish" but solid look
  const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame(() => {
    if (meshRef.current) {
      // Rotate based on scroll progress
      // We multiply by Math.PI * 2 to get full rotations
      // Adjust multiplier (e.g. 4) to control how many flips occur over the whole page
      const rotationSpeed = 8;
      meshRef.current.rotation.x = scrollProgress * Math.PI * rotationSpeed;
      meshRef.current.rotation.y = scrollProgress * Math.PI * rotationSpeed * 0.5;
      
      // Add a slight floating animation
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#ffffff" linewidth={1} />
        </lineSegments>
      </mesh>
    </group>
  );
};

export const CubeScene: React.FC<RotatingCubeProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <RotatingCube scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
