import Brush from "@/icons/brush-teeth.svg";
import BrushHair from "@/icons/brush-hair.svg";
import Dressed from "@/icons/dressed.svg";
import Breakfast from "@/icons/breakfast.svg";
import Potty from "@/icons/potty.svg";
import WashHands from "@/icons/wash-hands.svg";
import {FcLandscape, FcSerialTasks} from "react-icons/fc";

interface IIcon {
  iconKey?: IconKeys;
}

export enum IconKeys {
  BrushTeeth = "BrushTeeth",
  BrushHair = "BrushHair",
  Morning = "Morning",
  GetDressed = "GetDressed",
  Breakfast = "Breakfast",
  Potty = "Potty",
  WashHands = "WashHands",
}

export default function TaskIcon({iconKey}: IIcon) {
  switch (iconKey) {
    case IconKeys.BrushTeeth:
      return <Brush width="100%" height="100%" />;
    case IconKeys.BrushHair:
      return <BrushHair width="100%" height="100%" />;
    case IconKeys.Morning:
      return <FcLandscape className="h-full w-full" />
    case IconKeys.GetDressed:
      return <Dressed width="100%" height="100%" />;
    case IconKeys.Breakfast:
      return <Breakfast width="100%" height="100%" />;
    case IconKeys.Potty:
      return <Potty width="100%" height="100%" />;
    case IconKeys.WashHands:
      return <WashHands width="100%" height="100%" />;
    default:
      return <FcSerialTasks className="h-full w-full" />;
  }
}
