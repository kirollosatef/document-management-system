import dotenv from 'dotenv';

dotenv.config();

export const DB_URL = process.env.DB_URL;
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET;

export const MESSAGES = {
  youAreNotLoggedIn: 'انت غير مسجل دخول برجاء تسجيل الدخول',
  noUserFounded: 'لا يوجد مستخدم بهذا الاسم',
  wrongPassword: 'كلمة المرور غير صحيحة',
  usernameAlreadyInUse: 'اسم المستخدم مستخدم بالفعل',
  youAreNotAuthorized: 'لس لديك صلاحية للقيام بهذه العملية',
};
