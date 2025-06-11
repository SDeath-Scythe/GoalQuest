import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model({ url }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();
  const [isFlipping, setIsFlipping] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Scale the model once on load
  useEffect(() => {
    scene.scale.set(15, 15, 15);
  }, [scene]);

  // Trigger a backflip every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setStartTime(performance.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate the flip
  useFrame(() => {
    if (!isFlipping || !startTime || !meshRef.current) return;

    const elapsed = performance.now() - startTime;
    const duration = 1000; // 1 second flip
    const progress = Math.min(elapsed / duration, 1);

    // Smooth backflip motion using sine
    meshRef.current.rotation.x = Math.sin(progress * Math.PI) * Math.PI;

    if (progress >= 1) {
      // Reset after the flip
      meshRef.current.rotation.x = 0;
      setIsFlipping(false);
      setStartTime(null);
    }
  });

  return <primitive object={scene} ref={meshRef} />;
}
