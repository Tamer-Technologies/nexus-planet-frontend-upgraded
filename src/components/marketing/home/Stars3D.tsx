import { PointMaterial, Points } from "@react-three/drei";
import { ComponentProps, useMemo } from "react";
import * as THREE from "three";

interface Stars3DProps extends ComponentProps<"group"> {
  intensity?: number;
  colorsList?: string[];
  size?: number;
  noOfPoints?: number;
  maxRange?: number;
  animate?: boolean;
  speed?: number;
}

const Stars3D = ({
  intensity = 1,
  colorsList = ["#FFCF68", "#FF7E7E"],
  size = 0.05,
  noOfPoints = 100,
  maxRange = 20,
  ...props
}: Stars3DProps) => {
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(noOfPoints * 3);
    const colors = new Float32Array(noOfPoints * 3);

    const baseColors = colorsList.map((color) => new THREE.Color(color));

    for (let i = 0; i < positions.length; i++) {
      positions[i * 3] = (Math.random() - 0.5) * maxRange;
      positions[i * 3 + 1] = (Math.random() - 0.5) * maxRange;
      positions[i * 3 + 2] = (Math.random() - 0.5) * maxRange;

      const chosenColor =
        baseColors[Math.floor(Math.random() * baseColors.length)];

      colors[i * 3] = chosenColor.r * intensity;
      colors[i * 3 + 1] = chosenColor.g * intensity;
      colors[i * 3 + 2] = chosenColor.b * intensity;
    }

    return [positions, colors];
  }, [intensity, colorsList, noOfPoints, maxRange]);

  return (
    <group {...props}>
      <Points
        positions={positions}
        colors={colors}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          vertexColors
          transparent
          depthWrite={false}
          size={size}
        />
      </Points>
    </group>
  );
};

export default Stars3D;
