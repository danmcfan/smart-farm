import Map from "./components/Map";
import LayerControls from "./components/LayerControls";


export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-5/6 md:w-[46rem] h-[23rem] mb-4">
        <Map lng={-120.0} lat={37.5} zoom={4} />
      </div>
      <LayerControls />
    </main>
  );
}
