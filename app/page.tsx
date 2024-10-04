"use client";

import { useState, useEffect } from "react";
import { PanelLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Map from "@/components/map";
import Controls from "@/components/controls";
import Legend from "@/components/legend";

export default function Page() {
  const [layer, setLayer] = useState("soil");
  const [attribute, setAttribute] = useState("bulkDensity");
  const [depth, setDepth] = useState(0);

  const [column, setColumn] = useState("bulk_density_0");
  const [min, setMin] = useState(50);
  const [max, setMax] = useState(200);

  useEffect(() => {
    const { column, min, max } = getColumn(attribute, depth);
    setColumn(column);
    setMin(min);
    setMax(max);
  }, [layer, attribute, depth]);

  return (
    <div className="w-screen h-screen">
      <div className="gap-4 p-4 h-full flex flex-col lg:hidden">
        <div className="flex justify-between w-full">
          <Sheet>
            <SheetHeader className="sr-only">
              <SheetTitle>Controls</SheetTitle>
              <SheetDescription>Toggle menu</SheetDescription>
            </SheetHeader>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden mr-5">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="pb-12" side="top">
              <Controls
                layer={layer}
                attribute={attribute}
                depth={depth}
                setLayer={setLayer}
                setAttribute={setAttribute}
                setDepth={setDepth}
              />
            </SheetContent>
          </Sheet>
          <div className="w-full">
            <Legend min={min} max={max} />
          </div>
        </div>
        <div className="w-full h-full">
          <Map column={column} min={min} max={max} />
        </div>
        <div className="w-full h-32 flex items-center justify-center">
          <p className="text-sm font-bold">
            Smart Farm © {new Date().getFullYear()}
          </p>
        </div>
      </div>
      <div className="grid-cols-4 gap-4 p-4 h-full hidden lg:grid">
        <div className="col-span-3">
          <Map column={column} min={min} max={max} />
        </div>
        <div className="p-2">
          <Legend min={min} max={max} />
          <Separator className="my-4 w-full" />
          <Controls
            layer={layer}
            attribute={attribute}
            depth={depth}
            setLayer={setLayer}
            setAttribute={setAttribute}
            setDepth={setDepth}
          />
        </div>
      </div>
    </div>
  );
}

function getColumn(attribute: string, depth: number) {
  const columns = {
    bulkDensity: {
      column: `bulk_density_${depth}`,
      min: 50,
      max: 200,
    },
    clayContent: {
      column: `clay_${depth}`,
      min: 0,
      max: 50,
    },
    organicCarbon: {
      column: `organic_carbon_${depth}`,
      min: 0,
      max: 60,
    },
    ph: {
      column: `ph_${depth}`,
      min: 40,
      max: 100,
    },
    sandContent: {
      column: `sand_${depth}`,
      min: 0,
      max: 100,
    },
    waterContent: {
      column: `water_content_${depth}`,
      min: 0,
      max: 60,
    },
    precipitation: {
      column: "prcp",
      min: 0,
      max: 10,
    },
    solarRadiation: {
      column: "srad",
      min: 200,
      max: 600,
    },
    snowWaterEquivalent: {
      column: "swe",
      min: 0,
      max: 1500,
    },
    minimumTemperature: {
      column: "tmin",
      min: -20,
      max: 40,
    },
    maximumTemperature: {
      column: "tmax",
      min: -20,
      max: 40,
    },
    waterVaporPressure: {
      column: "vp",
      min: 200,
      max: 1400,
    },
    ndvi: {
      column: "ndvi",
      min: 0,
      max: 0.5,
    },
  };

  return columns[attribute as keyof typeof columns];
}
