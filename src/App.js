//import * as THREE from 'three'
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
	PerspectiveCamera,
	ContactShadows,
	OrbitControls,
	TorusKnot,
	Cloud,
	Plane,
	Box
} from '@react-three/drei';

import './styles.css';

const Scene = () => {
	const boxRef = useRef();
	const tRef = useRef();
	useFrame(() => {
		boxRef.current.rotation.y += 0.022;
		boxRef.current.rotation.x += 0.002;
		boxRef.current.rotation.z += 0.003;
		tRef.current.rotation.y += 0.002;
		tRef.current.rotation.x += 0.002;
		tRef.current.rotation.z += 0.003;
	});
	return (
		<group>
			<Box
				args={[100, 15, 10]}
				castShadow
				position={[0, 10, 0]}
				ref={boxRef}>
				<meshStandardMaterial
					attach="material"
					color="purple"
					metalness={0.1}
					roughtness={1.0}
					emissive={0.5}
				/>
			</Box>

			<Plane
				receiveShadow
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -3, 0]}
				args={[1500, 1500]}>
				<meshStandardMaterial attach="material" color="grey" />
			</Plane>

			<mesh position={[0, 0, -10]} ref={tRef}>
				<boxGeometry args={[20, 20, 20]} receiveShadow />
				<meshStandardMaterial
					color="blue"
					attach="material"
					metalness={1.0}
					roughness={10.71}
					emissive={10.51}
				/>
			</mesh>

			<TorusKnot
				ref={tRef}
				castShadow
				scale={5}
				args={[1.5, 0.42, 128, 12]}
				position={[12, 12, 12]}>
				<meshStandardMaterial
					attach="material"
					metalness={0.85}
					roughness={0.05}
					color="cyan"
					emissive={1}
				/>
			</TorusKnot>

			<Cloud
				seed={-212}
				position={[12, 15, 10]}
				segments={14}
				scale={4.1}
				depth={0.83}
				depthTest={1}
				color="#00ff69"
			/>
			<Cloud
				seed={-24}
				position={[5, 35, -20]}
				segments={10}
				scale={5.95}
				depth={0.35}
				depthTest={0}
				color="lightgrey"
			/>
		</group>
	);
};

export default function App() {
	return (
		<Canvas shadows camera={{ position: [-20, 10, 25], fov: 110 }}>
			<directionalLight
				intensity={0.5}
				castShadow
				shadow-mapSize-height={512}
				shadow-mapSize-width={512}
			/>

			<fog attach="fog" args={['white', 0, 175]} />
			<ambientLight intensity={0.32} />

			{/* <pointLight position={[5, 5, 5]} color="#00ff69" /> */}
			{/* <Environment ground={-0.5} preset="dawn" far={10} near={100} /> */}

			{/* <React.Suspense fallback={null}> */}

			<ContactShadows
				resolution={1024}
				position={[-1, 0, 3]}
				scale={123}
				blur={2}
				opacity={1}
				rotation={[Math.PI / 3, 0, 0]}
				far={124}
			/>

			<OrbitControls />

			<PerspectiveCamera position={[20, 20, 10]} resolution={255} />

			<Scene />
		</Canvas>
	);
}
