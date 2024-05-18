import { useState, useEffect } from 'react';

import ColorRamp from './ColorRamp';
import CustomMap from './CustomMap';
import LayerControls from './LayerControls';

import { getColorOptions } from '../utils/colors';

const FullMap = () => {
    const [columnName, setColumnName] = useState("bulk_density_0");
    const [minMax, setMinMax] = useState([50, 200]);
    const [colorOptions, setColorOptions] = useState(getColorOptions(50, 200));

    const [selectedButton, setSelectedButton] = useState("soil");
    const [selectedOption, setSelectedOption] = useState("bulk_density");
    const [selectedRange, setSelectedRange] = useState(0);

    useEffect(() => {
        if (selectedButton === "soil") {
            setColumnName(`${selectedOption}_${selectedRange}`);
        } else {
            setColumnName(selectedOption);
        }
    }, [selectedOption, selectedRange]);

    useEffect(() => {
        let [min, max] = [0, 0];

        if (columnName.startsWith('bulk_density')) {
            [min, max] = [50, 200];
        } else if (columnName.startsWith('clay')) {
            [min, max] = [0, 50];
        } else if (columnName.startsWith('ph')) {
            [min, max] = [40, 100];
        } else if (columnName.startsWith('sand')) {
            [min, max] = [0, 100];
        } else if (columnName.startsWith('organic_carbon')) {
            [min, max] = [0, 60];
        } else if (columnName.startsWith('water_content')) {
            [min, max] = [0, 60];
        } else if (columnName.startsWith('prcp')) {
            [min, max] = [0, 10];
        } else if (columnName.startsWith('srad')) {
            [min, max] = [200, 600];
        } else if (columnName.startsWith('swe')) {
            [min, max] = [0, 1500];
        } else if (columnName.startsWith('tmax')) {
            [min, max] = [-20, 40];
        } else if (columnName.startsWith('tmin')) {
            [min, max] = [-20, 40];
        } else if (columnName.startsWith('vp')) {
            [min, max] = [200, 1400];
        } else if (columnName.startsWith('ndvi')) {
            [min, max] = [0, 0.5];
        }

        setMinMax([min, max]);
        setColorOptions(getColorOptions(min, max));
    }, [columnName])

    return (
        <>
            <CustomMap
                columnName={columnName}
                colorOptions={colorOptions}
            />
            <LayerControls
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
            />
        </>
    )
}

export default FullMap;