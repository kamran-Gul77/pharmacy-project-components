"use client";
import React, { useState } from "react";
import icon from "../../../public/globe.svg";
import { LucideStar } from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

import SelectDropdown from "@/components/elements/SelectDropdown";
import CustomSelect from "@/components/elements/CustomSelect";
const GlobeIcon = () => <Image src={icon} alt="Globe" width={16} height={16} />;

const Page = () => {
  const [singleFruit, setSingleFruit] = useState<string>("");
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-10 p-10">
        {/* Variants */}
        <div className="flex flex-wrap gap-4">
          <Button>Default dsfdfdf dfsdf</Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <LucideStar className="size-4" />
          </Button>
        </div>

        {/* Effects */}
        <div className="flex flex-wrap gap-4">
          <Button effect="ringHover">Ring Hover</Button>
          <Button effect="shine">Shine</Button>
          <Button effect="shineHover">Shine Hover</Button>
          <Button effect="gooeyRight">Gooey Right</Button>
          <Button effect="gooeyLeft">Gooey Left</Button>
          <Button effect="underline" variant="link">
            Underline
          </Button>
          <Button effect="hoverUnderline" variant="link">
            Hover Underline
          </Button>
          <Button effect="gradientSlideShow" className="text-white">
            Gradient Slide Show
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button icon={GlobeIcon} iconPlacement="left">
            Left Icon
          </Button>
          <Button icon={GlobeIcon} iconPlacement="right">
            Right Icon
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button effect="expandIcon" icon={GlobeIcon} iconPlacement="left">
            Expand Left Icon
          </Button>
          <Button effect="expandIcon" icon={GlobeIcon} iconPlacement="right">
            Expand Right Icon
          </Button>
        </div>

        {/* Combination Example */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="destructive"
            size="lg"
            effect="shine"
            icon={LucideStar}
            iconPlacement="left"
          >
            Full Combo
          </Button>
          <Button variant="ghost" effect="gooeyRight" size="sm">
            Ghost + Gooey Right
          </Button>
        </div>
        <div>kamiiiiiiiiiiiiiiiiiii</div>
        <div className="flex flex-col gap-10 p-10">
          {/* Single Selection */}
          <CustomSelect options={options} />
          <SelectDropdown
            value={singleFruit}
            onChange={(val) => setSingleFruit(val as string)}
            label="Pick a Fruit"
            placeholder="Choose one fruit"
            options={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana" },
              { value: "orange", label: "Orange" },
            ]}
            selectTriggerProps={{ className: "w-64" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
