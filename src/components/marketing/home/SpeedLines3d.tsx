import { useFrame } from "@react-three/fiber";
import { ComponentProps, useMemo, useRef } from "react";
import * as THREE from "three";

interface SpeedLines3dProps extends ComponentProps<"mesh"> {
  hovered: boolean;
  cylinderArgs?: [number, number, number, number, number, boolean];
}

const SpeedLines3d = ({
  hovered,
  cylinderArgs = [1.5, 1.5, 3, 32, 1, true],
  ...props
}: SpeedLines3dProps) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const speedLinesShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#FFCF68") },
        uOpacity: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uOpacity;
  
        float hash(float n) { 
          return fract(sin(n) * 43758.5453123); 
        }
  
        void main() {
          float lineId = floor(vUv.x * 45.0); 
          float h = hash(lineId);
          
          float speed = uTime * (0.5 + h * 0.5);
          
          float offset = h * 100.0;
          
          float progress = fract((vUv.y * 0.5 - speed + offset) * 0.3); 
          

          float lineShape = smoothstep(0.0, 0.02, progress) * smoothstep(0.1, 0.07, progress);
  
          vec3 c1 = vec3(1.0, 0.3, 0.1); 
          vec3 c2 = vec3(1.0, 0.6, 0.3); 
          vec3 c3 = vec3(1.0, 0.4, 0.2); 
          vec3 baseColor = (h < 0.33) ? c1 : (h < 0.66 ? c2 : c3);
  
          float edgeFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          
          float finalAlpha = lineShape * edgeFade * uOpacity * (0.5 + h);
  
          gl_FragColor = vec4(baseColor * 5.0, finalAlpha);
        }
      `,
    }),
    [],
  );

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      shaderRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uOpacity.value,
        hovered ? 0.15 : 0.0,
        0.1,
      );
    }
  });

  return (
    <mesh {...props}>
      <cylinderGeometry args={cylinderArgs} />
      <shaderMaterial
        ref={shaderRef}
        args={[speedLinesShader]}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default SpeedLines3d;
