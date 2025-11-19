// platformIcons.ts
import { BsNintendoSwitch } from "react-icons/bs";
import { SiPlaystation, SiPlaystation4 } from "react-icons/si";
import { FaXbox, FaWindows } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { MdOutlineVideogameAsset } from "react-icons/md";
import type { IconType } from "react-icons";

export const platformIcons: Record<number, IconType> = {
  7: BsNintendoSwitch,
  18: SiPlaystation4,
  27: SiPlaystation,
  1: FaXbox,
  4: FaWindows,
  49: MdOutlineVideogameAsset,
};

export const platformColors: Record<number, string> = {
  7: "#E60012",
  18: "#003791",
  27: "#003791",
  1: "#107C10",
  4: "#00A4EF",
  49: "#E60012",
};

export const defaultPlatformIcon: IconType = GiConsoleController;
export const defaultPlatformColor = "#ccc";
