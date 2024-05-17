'use client';

import CustomMap from "./components/CustomMap";
import LayerControls from "./components/LayerControls";


export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <CustomMap />
      <LayerControls />
    </main>
  );
}
