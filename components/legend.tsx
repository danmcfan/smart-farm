export default function Legend({ min, max }: { min: number; max: number }) {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="text-sm font-bold text-center">
        <span>{min}</span>
      </div>
      <div
        className={`h-8 w-full rounded-lg bg-gradient-to-r from-[#0000ff] to-[#00ff80]`}
      />
      <div className="text-sm font-bold text-center">
        <span>{max}</span>
      </div>
    </div>
  );
}
