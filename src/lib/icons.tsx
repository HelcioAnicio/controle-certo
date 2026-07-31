import type { IconType } from "react-icons";
import {
  TbBook,
  TbBriefcase,
  TbBuilding,
  TbBulb,
  TbCash,
  TbCategory,
  TbChartBar,
  TbConfetti,
  TbDroplet,
  TbFolder,
  TbGift,
  TbHome,
  TbLayoutDashboard,
  TbListDetails,
  TbMovie,
  TbPigMoney,
  TbPlane,
  TbReportMoney,
  TbRepeat,
  TbSchool,
  TbSettings,
  TbShoppingCart,
  TbToolsKitchen2,
  TbTrendingUp,
  TbWifi,
} from "react-icons/tb";

export const CATEGORY_ICONS: Record<string, IconType> = {
  folder: TbFolder,
  home: TbHome,
  party: TbConfetti,
  trending: TbTrendingUp,
  book: TbBook,
  cash: TbCash,
  briefcase: TbBriefcase,
  gift: TbGift,
  cart: TbShoppingCart,
  water: TbDroplet,
  bulb: TbBulb,
  building: TbBuilding,
  wifi: TbWifi,
  food: TbToolsKitchen2,
  movie: TbMovie,
  plane: TbPlane,
  piggy: TbPigMoney,
  chart: TbChartBar,
  graduation: TbSchool,
};

export function iconFor(key: string): IconType {
  return CATEGORY_ICONS[key] ?? TbFolder;
}

export const NAV_ICONS: Record<string, IconType> = {
  painel: TbLayoutDashboard,
  lancamentos: TbListDetails,
  fixos: TbRepeat,
  relatorios: TbReportMoney,
  categorias: TbCategory,
  config: TbSettings,
};
