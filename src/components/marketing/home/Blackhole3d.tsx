import { useFrame } from "@react-three/fiber";
import { ComponentProps, useRef, useMemo } from "react";
import * as THREE from "three";

interface Blackhole3dProps extends ComponentProps<"group"> {
  speed?: number;
  coreColor?: string;
  diskColor1?: string;
  diskColor2?: string;
  opacity?: number;
}

const Blackhole3d = ({
  speed = 1.5,
  coreColor = "#000000",
  diskColor1 = "#FF9A5B",
  diskColor2 = "#FFCF68",
  opacity = 0.6,
  ...props
}: Blackhole3dProps) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const blackholeShader = useMemo(
    () => ({
      uniforms: {
        ...THREE.UniformsLib["fog"],
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(diskColor1) },
        uColor2: { value: new THREE.Color(diskColor2) },
        uOpacity: { value: opacity }, // تعريف الـ Uniform
      },
      vertexShader: `
        varying vec2 vUv;
        #include <fog_pars_vertex>
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex> 
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uOpacity; // استلام الـ Uniform
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        #include <fog_pars_fragment>

        mat2 rotate(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        void main() {
            vec2 uv = vUv - 0.5;
            float dist = length(uv);

            float innerEdge = smoothstep(0.18, 0.22, dist);
            float outerEdge = smoothstep(0.5, 0.25, dist);
            float mask = innerEdge * outerEdge;

            vec2 distortedUv = uv * rotate(uTime * ${speed.toFixed(1)} - dist * 10.0);
            float noise = sin(distortedUv.x * 30.0) * cos(distortedUv.y * 30.0 + uTime * 3.0);

            vec3 finalColor = mix(uColor1, uColor2, noise + 0.5);

            // ضرب الـ alpha النهائي في uOpacity
            float alpha = mask * (0.5 + noise * 0.5) * uOpacity;
            
            gl_FragColor = vec4(finalColor * 2.0, alpha);
            
            #include <fog_fragment> 
        }
      `,
    }),
    [diskColor1, diskColor2, speed, opacity],
  );

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      shaderRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  return (
    <group {...props}>
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={opacity}
          fog={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[0, 0.5, 0]}>
        <planeGeometry args={[5, 5]} />
        <shaderMaterial
          ref={shaderRef}
          args={[blackholeShader]}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={true}
        />
      </mesh>
    </group>
  );
};

export default Blackhole3d;
