"use client";

import { Canvas } from "@react-three/fiber";
import { ComponentProps, useEffect, useState } from "react";
import Stars3D from "./Stars3D";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const HomeScene3D = ({ ...props }: ComponentProps<"div">) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="size-full bg-black" />;

  return (
    <div className="size-full bg-black" {...props}>
      <Canvas>
        <fog attach="fog" args={["#000000", 1, 15]} />
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
        <Stars3D intensity={2} noOfPoints={1000} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default HomeScene3D;
