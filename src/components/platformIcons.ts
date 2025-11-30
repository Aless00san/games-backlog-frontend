// platformIcons.ts
import { BsNintendoSwitch } from "react-icons/bs";
import {
  SiPlaystation,
  SiPlaystation4,
  SiNintendo3Ds,
  SiPlaystationportable,
} from "react-icons/si";
import { FaXbox, FaWindows } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import type { IconType } from "react-icons";

export const platformIcons: Record<string, IconType> = {
  "Nintendo Switch": BsNintendoSwitch,
  "PlayStation 4": SiPlaystation4,
  "Nintendo 3DS": SiNintendo3Ds,
  "Nintendo DS": SiNintendo3Ds,
  PSP: SiPlaystationportable,
  Web: TbWorldWww,
  PlayStation: SiPlaystation,
  Xbox: FaXbox,
  PC: FaWindows,
  NES: MdOutlineVideogameAsset,
};

export const platformColors: Record<string, string> = {
  "Nintendo Switch": "#E60012",
  "Nintendo 3DS": "#E60012",
  "Nintendo DS": "#E60012",
  "PlayStation 4": "#003791",
  PSP: "#003791",
  Web: "#6F00FF",
  PlayStation: "#003791",
  Xbox: "#107C10",
  PC: "#00A4EF",
  NES: "#E60012",
};

export const specialStyles: Record<string, string> = {
  PSP: "need-background rounded-icon",
  "PlayStation 4": "need-background rounded-icon",
};

export const defaultPlatformIcon: IconType = GiConsoleController;
export const defaultPlatformColor = "#ccc";
export const defaultspecialStyles = "";
