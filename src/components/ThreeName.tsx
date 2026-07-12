import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import type { Group } from "three";

/** Keeps the name a consistent width across screen sizes. */
function Rig() {
  useFrame(({ camera, size }) => {
    const aspect = size.width / size.height;
    const targetZ = Math.min(16, Math.max(6, 8.6 / (aspect || 1)));
    camera.position.z += (targetZ - camera.position.z) * 0.1;
  });
  return null;
}


function FloatingName() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    // Smoothly rotate toward the cursor for a hovering 3D feel.
    group.current.rotation.y += (x * 0.5 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.35 - group.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={group}>
        <Text
          fontSize={1.35}
          letterSpacing={0.02}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#0a1a10"
        >
          DANGER
          <meshStandardMaterial
            color="#28dc78"
            emissive="#22c55e"
            emissiveIntensity={1.4}
            metalness={0.6}
            roughness={0.25}
          />
        </Text>
      </group>
    </Float>
  );
}

export function ThreeName() {
  return (
    <div className="h-[130px] w-full sm:h-[180px] md:h-[240px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2.4} color="#4ade80" />
        <pointLight position={[-5, -3, 2]} intensity={1.4} color="#16a34a" />
        <Rig />
        <Suspense fallback={null}>
          <FloatingName />
        </Suspense>
      </Canvas>
    </div>
  );
}
