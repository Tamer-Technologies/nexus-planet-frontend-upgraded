import * as THREE from "three";
import React, { ComponentProps, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { PlanetAnimationOptions } from "@/types/three-animations";

type GLTFResult = GLTF & {
  nodes: {
    Icosphere001: THREE.Mesh;
    Sphere: THREE.Mesh;
  };
  materials: {
    ["Material.013"]: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
  };
};

interface Planet3DProps extends ComponentProps<"group"> {
  animationOptions: PlanetAnimationOptions;
}

export function Planet3D({
  scale = 1,
  animationOptions,
  ...props
}: Planet3DProps) {
  const planetRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    "/models3D/nexus-planet-model.glb",
  ) as unknown as GLTFResult;

  useFrame((_, delta) => {
    if (!planetRef.current) return;

    planetRef.current.rotation.y += delta * animationOptions.speed;
  });
  return (
    <group {...props} dispose={null} scale={scale} ref={planetRef}>
      <mesh
        geometry={nodes.Icosphere001.geometry}
        material={materials["Material.013"]}
        position={[-11.428, -0.143, -3.889]}
        rotation={[0, 1.167, 0]}
        scale={[0.756, 0.602, 0.756]}
      />

      <mesh
        geometry={nodes.Sphere.geometry}
        material={materials["Material.009"]}
        rotation={[1.606, -0.928, 0.307]}
        scale={6.261}
      />
    </group>
  );
}

useGLTF.preload("/models3D/nexus-planet-model.glb");
