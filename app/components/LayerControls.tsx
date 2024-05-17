'use client';

import { useState, useEffect } from 'react';

import Buttons from './Buttons';
import Dropdown from './Dropdown';
import Range from './Range';

type Option = {
    value: string;
    label: string;
};

type Dict<TValue> = {
    [key: string]: TValue;
};

const LayerControls = () => {
    const options: Dict<Option[]> = {
        "soil": [
            { value: "bulk_density", label: "Bulk Density (10 * kg / m^3)" },
            { value: "clay", label: "Clay Content (%)" },
            { value: "ph", label: "Soil pH (10 * pH in H2O)" },
            { value: "sand", label: "Sand Content (%)" },
            { value: "organic_carbon", label: "Soil Organic Carbon (5 * g / kg)" },
            { value: "water_content", label: "Soil Water Content (%)" }
        ],
        "weather": [
            { value: "prcp", label: "Percipitation (mm)" },
            { value: "srad", label: "Solar Radiation (W/m^2)" },
            { value: "swe", label: "Snow Water Equivalent (kg / m^2)" },
            { value: "tmax", label: "Maximum Temperature (C)" },
            { value: "tmin", label: "Minimum Temperature (C)" },
            { value: "vp", label: "Water Vapor Pressure (Pa)" }
        ],
        "vegetation": [
            { value: "ndvi", label: "NDVI" },
        ],
    };

    const [selectedButton, setSelectedButton] = useState("soil");
    const [selectedOption, setSelectedOption] = useState("bulk_density");
    const [selectedRange, setSelectedRange] = useState(0);

    useEffect(() => {
        const defaultOption = options[selectedButton]?.[0]?.value;
        if (defaultOption) {
            setSelectedOption(defaultOption);
        }
    }, [selectedButton]);

    return (
        <div className="flex flex-col justify-center items-center">
            <Buttons selected={selectedButton} setSelected={setSelectedButton} />
            <Dropdown options={options[selectedButton]} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            {selectedButton === "soil" && <Range selectedRange={selectedRange} setSelectedRange={setSelectedRange} />}
        </div>
    );
}

export default LayerControls;