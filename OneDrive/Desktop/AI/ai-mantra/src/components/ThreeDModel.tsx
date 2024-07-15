// src/components/SpaceBackground.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Group, PerspectiveCamera as PerspectiveCameraImpl } from 'three';

const RotatingStars = () => {
  const starsRef = useRef<Group>(null);
  const cameraRef = useRef<PerspectiveCameraImpl>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 10;
      cameraRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.1) * 10;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} />
      <group ref={starsRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      </group>
    </>
  );
};

const SpaceBackground = () => {
  return (
    <Canvas className="absolute overflow-hidden">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <RotatingStars />
      <OrbitControls />
    </Canvas>
  );
};

export default SpaceBackground;
