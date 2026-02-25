import * as THREE from "three";
import { ComponentProps } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Icosphere019: THREE.Mesh;
    Icosphere019_1: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshBasicMaterial;
    ["Material.001"]: THREE.MeshBasicMaterial;
  };
};

export function StarRepoCard({ ...props }: ComponentProps<"group">) {
  const { nodes, materials } = useGLTF(
    "/models3D/star-repo-card.glb",
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group
        scale={[0.209, 0.131, 0.131]}
        position={[0, 0, 0]}
        rotation={[0, 0, 1]}
      >
        <mesh
          geometry={nodes.Icosphere019.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Icosphere019_1.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models3D/star-repo-card.glb");
