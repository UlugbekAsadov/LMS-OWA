export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  JWT_ERROR: "JWT_ERROR",
  BANK_NOT_FOUND: "BANK_NOT_FOUND",
  COMPANY_ALREADY_EXISTS_IN_USER: "COMPANY_ALREADY_EXISTS_IN_USER",
};

export const ERROR_MESSAGE_TRANSLATIONS = {
  [ERROR_MESSAGES.INVALID_CREDENTIALS]: "Parol yoki Telefon nomer notog'ri",
  [ERROR_MESSAGES.VALIDATION_ERROR]: "Telefon raqam notog'ri formatda",
  [ERROR_MESSAGES.BANK_NOT_FOUND]: "Bank topilmadi",
  [ERROR_MESSAGES.COMPANY_ALREADY_EXISTS_IN_USER]: "Bu kompaniya mavjud",
};
