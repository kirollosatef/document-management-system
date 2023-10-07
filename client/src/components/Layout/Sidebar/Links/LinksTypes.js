import CategoryIcon from '@mui/icons-material/Category';
import ArchiveIcon from '@mui/icons-material/Archive';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


export const userLinks = [
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الرئيسية",
    icon: HomeIcon,
    link: "/",
    special: true,
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الافسام",
    icon: CategoryIcon,
    link: "/departments",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الارشيف",
    icon: ArchiveIcon,
    link: "/archive",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "المستخدمون",
    icon: GroupIcon,
    link: "/users",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الاعدادات",
    icon: SettingsIcon,
    link: "/settings",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "مساعدة",
    icon: QuestionMarkIcon,
    link: "/help",
  },
];
