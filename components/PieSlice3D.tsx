// components/PieSlice3D.tsx
import { useMemo } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { Mesh } from "three";

interface PieSliceProps {
  startAngle: number;
  angle: number;
  radius: number;
  height: number;
  color: string;
  label: string;
}

export default function PieSlice3D({
  startAngle,
  angle,
  radius,
  height,
  color,
  label,
}: PieSliceProps) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.absarc(0, 0, radius, startAngle, startAngle + angle, false);
    s.lineTo(0, 0);
    return s;
  }, [startAngle, angle, radius]);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false,
    });
  }, [shape, height]);

  const midAngle = startAngle + angle / 2;
  const labelPos: [number, number, number] = [
    Math.cos(midAngle) * radius * 0.6,
    height + 0.1,
    Math.sin(midAngle) * radius * 0.6,
  ];

  return (
    <group>
      <mesh geometry={geometry as THREE.BufferGeometry}>
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={labelPos} fontSize={0.2} color="black">
        {label}
      </Text>
    </group>
  );
}
