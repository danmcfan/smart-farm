"use client";

import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Skeleton } from "@/components/ui/skeleton";
import { getColorOptions } from "@/lib/colors";
import "mapbox-gl/dist/mapbox-gl.css";

const center = [-120.0, 37.5] as [number, number];
const zoom = 5;

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
    url: "mapbox://danny-darko.945a4o5j",
    sourceLayer: "california_10000-4u0y3s",
    minZoom: 6,
    maxZoom: 8,
  },
  {
    scale: 5000,
    url: "mapbox://danny-darko.96hf0e0o",
    sourceLayer: "california_5000-2ku4fl",
    minZoom: 8,
    maxZoom: 9,
  },
  {
    scale: 2500,
    url: "mapbox://danny-darko.dd0wxoom",
    sourceLayer: "california_2500-9c20ty",
    minZoom: 9,
    maxZoom: 24,
  },
];

export default function Map({
  column = {
    name: "bulk_density_0",
    min: 50,
    max: 200,
  },
}: {
  column: {
    name: string;
    min: number;
    max: number;
  };
}) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/streets-v9",
      center: center,
      zoom: zoom,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
      map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");

      sources.forEach((source) => {
        map.addSource(`gridSource-${source.scale}`, {
          type: "vector",
          url: source.url,
        });
        map.addLayer({
          id: `gridLayer-${source.scale}`,
          type: "fill",
          source: `gridSource-${source.scale}`,
          "source-layer": source.sourceLayer,
          paint: {
            "fill-color": [
              "interpolate",
              ["linear"],
              ["get", column.name],
              ...getColorOptions(column.min, column.max).flatMap(
                (colorOption) => [colorOption.value, colorOption.color]
              ),
            ],
            "fill-opacity": 0.75,
          },
          minzoom: source.minZoom,
          maxzoom: source.maxZoom,
        });

        setLoading(false);
        setMounted(true);
      });
    });
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mounted) return;

    sources.forEach((source) => {
      if (!mapRef.current) return;
      mapRef.current.setPaintProperty(
        `gridLayer-${source.scale}`,
        "fill-color",
        [
          "interpolate",
          ["linear"],
          ["get", column.name],
          ...getColorOptions(column.min, column.max).flatMap((colorOption) => [
            colorOption.value,
            colorOption.color,
          ]),
        ]
      );
    });
  }, [column, mounted]);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full rounded-lg" ref={mapContainer} />
      {loading && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      )}
    </div>
  );
}
