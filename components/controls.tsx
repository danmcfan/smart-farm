import { Shovel, Umbrella, Leaf } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Controls({
  layer,
  attribute,
  depth,
  setLayer,
  setAttribute,
  setDepth,
}: {
  layer: string;
  attribute: string;
  depth: number;
  setLayer: (layer: string) => void;
  setAttribute: (attribute: string) => void;
  setDepth: (depth: number) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-8">
      <div>
        <Label htmlFor="layer" className="text-sm font-bold">
          Layer
        </Label>

        <Tabs
          id="layer"
          value={layer}
          onValueChange={(value) => {
            setLayer(value);
            if (value === "soil") {
              setAttribute("bulkDensity");
            } else if (value === "weather") {
              setAttribute("precipitation");
            } else if (value === "vegetation") {
              setAttribute("ndvi");
            }
          }}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3 mb-8">
            {[
              {
                value: "soil",
                label: "Soil",
                icon: <Shovel className="size-4" />,
              },
              {
                value: "weather",
                label: "Weather",
                icon: <Umbrella className="size-4" />,
              },
              {
                value: "vegetation",
                label: "Vegetation",
                icon: <Leaf className="size-4" />,
              },
            ].map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
                {tab.icon}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="soil">
            <div className="flex flex-col gap-8">
              <AttributeSelect
                attribute={attribute}
                attributes={[
                  { value: "bulkDensity", label: "Bulk Density" },
                  { value: "clayContent", label: "Clay Content" },
                  { value: "organicCarbon", label: "Organic Carbon" },
                  { value: "ph", label: "pH" },
                  { value: "sandContent", label: "Sand Content" },
                  { value: "waterContent", label: "Water Content" },
                ]}
                setAttribute={setAttribute}
              />

              <div>
                <Label htmlFor="depth" className="text-sm font-bold">
                  Depth
                </Label>

                <div className="relative">
                  <Slider
                    id="depth"
                    min={0}
                    max={200}
                    step={1}
                    value={[depth]}
                    className="mt-2"
                    onValueChange={(value) => {
                      const snapPoints = [0, 10, 30, 60, 100, 200];
                      const closestValue = snapPoints.reduce((prev, curr) =>
                        Math.abs(curr - value[0]) < Math.abs(prev - value[0])
                          ? curr
                          : prev
                      );
                      setDepth(closestValue);
                    }}
                  />
                  <Label className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 text-sm">
                    {depth}cm
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="weather">
            <div className="flex flex-col gap-4">
              <AttributeSelect
                attribute={attribute}
                attributes={[
                  { value: "precipitation", label: "Precipitation" },
                  { value: "solarRadiation", label: "Solar Radiation" },
                  {
                    value: "snowWaterEquivalent",
                    label: "Snow Water Equivalent",
                  },
                  {
                    value: "minimumTemperature",
                    label: "Minimum Temperature",
                  },
                  {
                    value: "maximumTemperature",
                    label: "Maximum Temperature",
                  },
                  {
                    value: "waterVaporPressure",
                    label: "Water Vapor Pressure",
                  },
                ]}
                setAttribute={setAttribute}
              />
            </div>
          </TabsContent>
          <TabsContent value="vegetation">
            <div className="flex flex-col gap-4">
              <AttributeSelect
                attribute={attribute}
                attributes={[{ value: "ndvi", label: "NDVI" }]}
                setAttribute={setAttribute}
                disabled={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AttributeSelect({
  attribute,
  attributes,
  setAttribute,
  disabled = false,
}: {
  attribute: string;
  attributes: { value: string; label: string }[];
  setAttribute: (attribute: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <Label htmlFor="attribute" className="text-sm font-bold">
        Attribute
      </Label>

      <Select
        value={attribute}
        disabled={disabled}
        onValueChange={setAttribute}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an attribute" />
        </SelectTrigger>
        <SelectContent>
          {attributes.map((attribute) => (
            <SelectItem key={attribute.value} value={attribute.value}>
              {attribute.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
