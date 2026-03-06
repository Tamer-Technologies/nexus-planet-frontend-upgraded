import { useFrame } from "@react-three/fiber";
import { ComponentProps, useRef, useMemo } from "react";
import * as THREE from "three";

interface InfiniteGrid3dProps extends ComponentProps<"mesh"> {
  gridSize?: number;
  colorStart?: string;
  colorEnd?: string;
  speed?: number;
  fadeDistance?: number;
}

const InfiniteGrid3d = ({
  gridSize = 1.0,
  colorStart = "#EAAE2C",
  colorEnd,
  speed = 1.0,
  fadeDistance = 20.0,
  ...props
}: InfiniteGrid3dProps) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const finalColorEnd = colorEnd || colorStart;

  const gridShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color(colorStart) },
        uColorEnd: { value: new THREE.Color(finalColorEnd) },
        uGridSize: { value: gridSize },
        uFadeDistance: { value: fadeDistance },
      },
      vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
      fragmentShader: `
      varying vec3 vWorldPosition;
      uniform float uTime;
      uniform vec3 uColorStart;
      uniform vec3 uColorEnd;
      uniform float uGridSize;
      uniform float uFadeDistance;

      void main() {
        vec2 movingPos = vWorldPosition.xz;
        movingPos.y += uTime * ${speed.toFixed(2)};

        vec2 grid = abs(fract(movingPos / uGridSize - 0.5) - 0.5) / (fwidth(movingPos) / uGridSize);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - min(line, 1.0);

        float dist = distance(vWorldPosition.xz, vec2(0.0));
        
        float mixFactor = clamp(dist / uFadeDistance, 0.0, 1.0);
        vec3 finalColor = mix(uColorStart, uColorEnd, mixFactor);

        float mask = smoothstep(uFadeDistance, uFadeDistance * 0.5, dist);

        gl_FragColor = vec4(finalColor, alpha * mask);
      }
    `,
    }),
    [colorStart, finalColorEnd, gridSize, fadeDistance, speed],
  );

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <planeGeometry args={[40, 40]} />
      <shaderMaterial
        ref={shaderRef}
        args={[gridShader]}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default InfiniteGrid3d;
