const Range: React.FC<{ selectedRange: any, setSelectedRange: any }> = ({ selectedRange, setSelectedRange }) => {
    const depths = ["0", "10", "30", "60", "100", "200"];

    const handleChange = (event: any) => {
        const index = parseInt(event.target.value);
        setSelectedRange(depths[index]);
    };

    return (
        <div className="w-72 lg:w-80 flex flex-col justify-center items-center transition-all duration-300 ease-in-out">
            <input type="range" min="0" max="5" defaultValue="0" className="range range-primary range-sm" onChange={handleChange} />
            <div className="w-full flex justify-between text-xs px-2 mb-4 ">
                {[0, 1, 2, 3, 4, 5].map((i) => (<span key={i}>|</span>))}
            </div>
            <p className="text-sm lg:text-lg transition-all duration-300 ease-in-out">Depth: {selectedRange} cm</p>
        </div>
    );
};

export default Range;
