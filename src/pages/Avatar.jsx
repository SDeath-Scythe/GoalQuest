import { useRef, useEffect, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function AvatarModel() {
  const gltf = useLoader(GLTFLoader, "/avatar.glb");
  const meshRef = useRef();

  const [flipStart, setFlipStart] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  // Trigger flip every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFlipping) {
        setIsFlipping(true);
        setFlipStart(performance.now());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isFlipping]);

  // Flip animation
  useFrame(() => {
    if (!isFlipping || !flipStart || !meshRef.current) return;

    const elapsed = performance.now() - flipStart;
    const duration = 1000; // 1 second flip
    const progress = Math.min(elapsed / duration, 1);

    // Ease in-out rotation from 0 to 2π (full flip)
    const eased = Math.sin(progress * Math.PI);
    meshRef.current.rotation.x = eased * Math.PI;

    if (progress >= 1) {
      setIsFlipping(false);
      meshRef.current.rotation.x = 0; // reset to upright
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      scale={2.5}
      position={[0, -1, 0]}
    />
  );
}
