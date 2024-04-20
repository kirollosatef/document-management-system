import CategoryIcon from '@mui/icons-material/Category';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
    text: "اضف كتاب",
    icon: NoteAddIcon,
    link: "/add-book",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "الافسام",
    icon: CategoryIcon,
    link: "/departments",
  },
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    text: "المجلدات",
    icon: FolderIcon,
    link: "/folders",
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
