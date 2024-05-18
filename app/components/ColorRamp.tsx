interface ColorRampProps {
    colors: string[];
    minMax: number[];
}

const ColorRamp: React.FC<ColorRampProps> = ({ colors, minMax }) => {
    return (
        <div className="absolute top-0 inset-x-0 mx-auto w-[75%] p-1 md:p-1.5 lg:p-2 rounded-md bg-black bg-opacity-75 flex justify-center transition-all duration-300 ease-in-out">
            <div className="flex flex-col items-center">
                <div className="flex items-center text-xs md:text-sm lg:text-md transition-all duration-300 ease-in-out">
                    <div className="font-bold mr-2 transition-all duration-300 ease-in-out">{minMax[0]}</div>
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="size-2 md:size-4 lg:size-6 transition-all duration-300 ease-in-out" // Adjust width and height as needed
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                    <div className="font-bold ml-2 transition-all duration-300 ease-in-out">{minMax[1]}</div>
                </div>
            </div>
        </div>
    );
};

export default ColorRamp;