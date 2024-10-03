"use client";

import { useState } from "react";
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
  const [column, setColumn] = useState({
    name: "bulk_density_0",
    min: 50,
    max: 200,
    layer: "soil",
    attribute: "bulkDensity",
    depth: 0,
  });

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
              <Controls column={column} setColumn={setColumn} />
            </SheetContent>
          </Sheet>
          <div className="w-full">
            <Legend min={column.min} max={column.max} />
          </div>
        </div>
        <div className="w-full h-full">
          <Map column={column} />
        </div>
      </div>
      <div className="grid-cols-4 gap-4 p-4 h-full hidden lg:grid">
        <div className="col-span-3">
          <Map column={column} />
        </div>
        <div className="p-2">
          <Legend min={column.min} max={column.max} />
          <Separator className="my-4 w-full" />
          <Controls column={column} setColumn={setColumn} />
        </div>
      </div>
    </div>
  );
}
