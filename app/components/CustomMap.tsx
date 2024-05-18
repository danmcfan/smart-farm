import { useState } from 'react';
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Source, Layer } from 'react-map-gl';

import ColorRamp from './ColorRamp';

const CustomMap: React.FC<{ columnName: string, colorOptions: { value: number, color: string }[] }> = ({ columnName, colorOptions }) => {
    const sources = [
        {
            scale: 25000,
            url: "mapbox://danny-darko.d4v2kznn",
            sourceLayer: "california_25000-dh558w",
            minZoom: 0,
            maxZoom: 6,
        },
        {
            scale: 10000,
            url: 'mapbox://danny-darko.945a4o5j',
            sourceLayer: 'california_10000-4u0y3s',
            minZoom: 6,
            maxZoom: 8
        },
        {
            scale: 5000,
            url: 'mapbox://danny-darko.96hf0e0o',
            sourceLayer: 'california_5000-2ku4fl',
            minZoom: 8,
            maxZoom: 9
        },
        {
            scale: 2500,
            url: 'mapbox://danny-darko.dd0wxoom',
            sourceLayer: 'california_2500-9c20ty',
            minZoom: 9,
            maxZoom: 24
        }
    ];

    const [isLoading, setIsLoading] = useState(true);

    const onLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="w-[20rem] h-[20rem] md:w-[40rem] md:h-[30rem] lg:w-[60rem] lg:h-[40rem] mb-4 flex justify-center items-center relative transition-all duration-300 ease-in-out">
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className="loading loading-spinner h-32 w-32" />
                </div>
            )}

            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''}
                initialViewState={{
                    longitude: -120.0,
                    latitude: 37.5,
                    zoom: 4
                }}
                style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '0.75rem' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                attributionControl={false}
                onLoad={onLoad}
            >

                <NavigationControl position={"bottom-right"} />
                <FullscreenControl position={"bottom-right"} />
                <GeolocateControl position={"bottom-right"} />

                {sources.map((source) => (
                    <Source
                        key={`gridSource-${source.scale}`}
                        id={`gridSource-${source.scale}`}
                        type="vector"
                        url={source.url}>
                        <Layer
                            id={`gridLayer-${source.scale}`}
                            type="fill"
                            source-layer={source.sourceLayer}
                            paint={{
                                "fill-color": [
                                    "interpolate",
                                    ["linear"],
                                    ["get", columnName],
                                    ...colorOptions.flatMap((colorOption) => [
                                        colorOption.value,
                                        colorOption.color,
                                    ])
                                ],
                                "fill-opacity": 0.75
                            }}
                            minzoom={source.minZoom}
                            maxzoom={source.maxZoom}
                        />
                    </Source>
                ))}
            </Map>

            <ColorRamp colors={colorOptions.map((colorOption) => colorOption.color)} minMax={[colorOptions[0].value, colorOptions[colorOptions.length - 1].value]} />
        </div>
    );
};

export default CustomMap;