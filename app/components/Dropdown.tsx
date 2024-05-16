const Dropdown: React.FC<{ options: any, selectedOption: any, setSelectedOption: any }> = ({ options, selectedOption, setSelectedOption }) => {
    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <select
            className="select select-bordered border-2 w-80 mb-4 text-lg"
            value={selectedOption}
            onChange={handleChange}
        >
            {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
