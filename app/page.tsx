import Map from "./components/Map";

export default function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="w-3/4 h-[30rem]">
        <Map lng={-120.0} lat={37.5} zoom={4} />
      </div>
    </main>
  );
}
