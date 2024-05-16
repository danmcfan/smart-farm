'use client';

import { useState, useEffect, useRef, createContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

interface MapContextValue {
    map: mapboxgl.Map | null;
}

export const MapContext = createContext<MapContextValue>({ map: null });

interface MapProps {
    lng: number;
    lat: number;
    zoom: number;
    children?: React.ReactNode | React.ReactNode[];
}

const Map: React.FC<MapProps> = ({ lng, lat, zoom, children }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom,
            attributionControl: false,
        });

        map.current.on('load', () => {
            setIsLoading(false);
        });

        return () => {
            map.current?.remove();
        };
    }, []);

    return (
        <MapContext.Provider value={{ map: map.current }}>
            <div ref={mapContainer} className="w-full h-full rounded-xl relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="loading loading-spinner h-32 w-32"></span>
                    </div>
                )}
                {!isLoading && map.current && children}
            </div>
        </MapContext.Provider>
    );
};

export default Map;