'use client'
import {useState} from "react";
import Icon, {IconKeys} from "./Icon"; // optional, for preview

const iconLabels: Record<IconKeys, string> = {
  Breakfast: "Breakfast",
  BrushTeeth: "Brush Teeth",
  BrushHair: "Brush Hair",
  GetDressed: "Get Dressed",
  Morning: "Morning",
  Potty: "Potty",
  WashHands: "Wash Hands",
};

interface Props {
  name: string;
  showPreview?: boolean;
}

export default function IconSelect({name, showPreview = true}: Props) {
  const [selected, setSelected] = useState<IconKeys | undefined>();
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Pick an Icon
      </label>

      <select
        name={name}
        id={name}
        value={selected}
        onChange={(e) => setSelected(e.target.value as IconKeys)}
        className="w-full border rounded px-3 py-2"
      >
        <option key="null-option" value="">Default</option>
        {Object.entries(iconLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      {showPreview && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-600">Preview:</span>
          <div className="w-6 h-6">
            <Icon iconKey={selected} />
          </div>
        </div>
      )}
    </div>
  );
}

