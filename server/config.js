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
  departmentRemoved: 'تم حذف القسم بنجاح',
  userRemoved: 'تم حذف المستخدم بنجاح',
  folderNameIsRequired: 'اسم المجلد مطلوب',
  folderDescriptionIsRequired: 'وصف المجلد مطلوب',
  noFolderFounded: 'لا يوجد مجلد بهذا الاسم',
  folderAlreadyInUse: 'اسم المجلد مستخدم بالفعل',
  invalidFields: 'الرجاء ادخال جميع الحقول المطلوبة',
  archiveRemoved: 'تم حذف الارشيف بنجاح',
  noArchiveFounded: 'لا يوجد ارشيف بهذا الاسم',
  archiveCreated: 'تم انشاء الارشيف بنجاح',
  archiveUpdated: 'تم تعديل الارشيف بنجاح',
  fileUploadError: 'حدث خطأ اثناء رفع الملف',
  fileUploaded: 'تم رفع الملف بنجاح',
  noFileUploaded: 'الرجاء اختيار ملف',
  folderNotFound: 'لا يوجد مجلد بهذا الاسم',
  fileNotFound: 'لا يوجد ملف بهذا الاسم',
  fileUpdated: 'تم تعديل الملف بنجاح',
  fileRemoved: 'تم حذف الملف بنجاح',
  fileNotRemoved: 'حدث خطأ اثناء حذف الملف',
  fileNotUploaded: 'حدث خطأ اثناء رفع الملف',
  passwordLength: 'كلمة المرور يجب ان تكون اكثر من 8 حروف',
  invalidFolder: 'الرجاء اختيار مجلد صحيح',
};
