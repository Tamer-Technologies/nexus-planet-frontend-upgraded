import { useFrame } from "@react-three/fiber";
import { ComponentProps, useRef, useMemo } from "react";
import * as THREE from "three";

interface Blackhole3dProps extends ComponentProps<"group"> {
  speed?: number;
  coreColor?: string;
  diskColor1?: string;
  diskColor2?: string;
}

const Blackhole3d = ({
  speed = 1.5,
  coreColor = "#000000",
  diskColor1 = "#FF9A5B",
  diskColor2 = "#FFCF68",
  ...props
}: Blackhole3dProps) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  // استخدام useMemo مهم جداً للأداء عشان نتجنب إعادة بناء الـ Shader Object كل ريندر
  const blackholeShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(diskColor1) },
        uColor2: { value: new THREE.Color(diskColor2) },
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
        uniform vec3 uColor1;
        uniform vec3 uColor2;

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

            // استخدام سرعة ثابتة هنا لتجنب إعادة بناء الـ shader عند تغير السرعة لو حبينا
            vec2 distortedUv = uv * rotate(uTime * ${speed.toFixed(1)} - dist * 10.0);
            float noise = sin(distortedUv.x * 30.0) * cos(distortedUv.y * 30.0 + uTime * 3.0);

            // استخدام الألوان الممررة من الـ Props
            vec3 finalColor = mix(uColor1, uColor2, noise + 0.5);

            gl_FragColor = vec4(finalColor * 2.0, mask * (0.5 + noise * 0.5));
        }
      `,
    }),
    [diskColor1, diskColor2, speed],
  );

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group {...props}>
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color={coreColor} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <shaderMaterial
          ref={shaderRef}
          args={[blackholeShader]}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default Blackhole3d;
