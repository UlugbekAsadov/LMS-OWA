export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  JWT_ERROR: "JWT_ERROR",
  BANK_NOT_FOUND: "BANK_NOT_FOUND",
  COMPANY_ALREADY_EXISTS_IN_USER: "COMPANY_ALREADY_EXISTS_IN_USER",
  COURSE_ALREADY_EXISTS: "COURSE_ALREADY_EXISTS",
  COMPANY_BRAND_OR_LEGAL_NAME_ALREADY_EXISTS:
    "COMPANY_BRAND_OR_LEGAL_NAME_ALREADY_EXISTS",
  COMPANY_PHONE_ALREADY_EXISTS: "COMPANY_PHONE_ALREADY_EXISTS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  CONTRACT_TYPE_ALREADY_EXISTS: "CONTRACT_TYPE_ALREADY_EXISTS",
  ACCOUNT_ALREADY_EXISTS: "ACCOUNT_ALREADY_EXISTS",
  NOT_YOUR_COMPANY_SUBDOMAIN: "NOT_YOUR_COMPANY_SUBDOMAIN",
  PHONE_ALREADY_EXISTS: "PHONE_ALREADY_EXISTS",
};

export const ERROR_MESSAGE_TRANSLATIONS = {
  [ERROR_MESSAGES.CONTRACT_TYPE_ALREADY_EXISTS]: "Bu shartnoma turi mavjud",
  [ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS]: "Bu xodim mavjud",
  [ERROR_MESSAGES.INVALID_CREDENTIALS]: "Parol yoki Telefon nomer notog'ri",
  [ERROR_MESSAGES.VALIDATION_ERROR]: "Validatsiya xatosi",
  [ERROR_MESSAGES.BANK_NOT_FOUND]: "Bank topilmadi",
  [ERROR_MESSAGES.COMPANY_ALREADY_EXISTS_IN_USER]: "Bu kompaniya mavjud",
  [ERROR_MESSAGES.COURSE_ALREADY_EXISTS]: "Bu kurs mavjud",
  [ERROR_MESSAGES.COMPANY_BRAND_OR_LEGAL_NAME_ALREADY_EXISTS]:
    "Kompaniya nomi mavjud",
  [ERROR_MESSAGES.COMPANY_PHONE_ALREADY_EXISTS]:
    "Kompaniya telefon raqami mavjud",
  [ERROR_MESSAGES.INTERNAL_SERVER_ERROR]:
    "Server bilan bog'lanishda xatolik yuzaga keldi",
  [ERROR_MESSAGES.NOT_YOUR_COMPANY_SUBDOMAIN]:
    "Bu raqam sizing kampaniyangizda mavjud emas",
  [ERROR_MESSAGES.PHONE_ALREADY_EXISTS]: "Bu telefon raqami mavjud",
};
