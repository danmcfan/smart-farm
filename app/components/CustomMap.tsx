'use client';

import { useState } from 'react';
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Source, Layer } from 'react-map-gl';

const CustomMap = () => {
    const [isLoading, setIsLoading] = useState(true);

    const onLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="w-5/6 md:w-[46rem] h-[23rem] mb-4 flex justify-center items-center relative">
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

                <Source id="gridSource-25000" type="vector" url="mapbox://danny-darko.d4v2kznn">
                    <Layer
                        id="gridLayer-25000"
                        type="fill"
                        source-layer="california_25000-dh558w"
                        paint={{
                            "fill-color": "",
                            "fill-opacity": 0.5
                        }}
                        minzoom={0}
                        maxzoom={6}
                    />
                </Source>
            </Map>
        </div>
    );
};

export default CustomMap;