import SevereColdRoundedIcon from "@mui/icons-material/SevereColdRounded";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LockIcon from "@mui/icons-material/Lock";

const same = {
  id: Math.floor(Math.random() * 1000000) + 1,
  text: "قائمة السيرفرات",
  icon: SevereColdRoundedIcon,
  link: "../../../dashboard",
  special: false,
}
export const userLinks = [
  same,
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الاشتراك",
    icon: SubscriptionsIcon,
    link: "/dashboard/subscriptions",
    special: true,
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الاعدادات",
    icon: SettingsIcon,
    link: "/",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "تسجيل الخروج",
    icon: LogoutIcon,
    link: "/",
  },
];

export const serverLinks = [
  
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "تخصيص البوت",
    icon: SevereColdRoundedIcon,
    link: "server-info",
    special: true,
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الاحصائيات",
    icon: AutoAwesomeIcon,
    link: "statistics",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "اعدادات البوت",
    icon: SettingsIcon,
    link: "server-settings",
    special: true,
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "صلاحيات الداشبورد",
    icon: LockIcon,
    link: "server-permissions",
  },
  same,
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "تسجيل الخروج",
    icon: LogoutIcon,
    link: "/",
  },
];
