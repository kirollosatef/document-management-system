import dotenv from 'dotenv';

dotenv.config();

export const DB_URL = process.env.DB_URL;
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MAX_FILES = 5;

export const MESSAGES = {
  youAreNotLoggedIn: 'انت غير مسجل دخول برجاء تسجيل الدخول',
  noUserFounded: 'لا يوجد مستخدم بهذا الاسم',
  wrongPassword: 'كلمة المرور غير صحيحة',
  usernameAlreadyInUse: 'اسم المستخدم مستخدم بالفعل',
  youAreNotAuthorized: 'لس لديك صلاحية للقيام بهذه العملية',
  departmentNameIsRequired: 'اسم القسم مطلوب',
  noDepartmentFounded: 'لا يوجد قسم بهذا الاسم',
  roleIsRequired: 'الرجاء تحديد الدور',
  departmentNameAlreadyInUse: 'اسم القسم مستخدم بالفعل',
  maxFiles: 'لا يمكن رفع اكثر من 5 ملفات',
};

