export const isValidMobilePhoneNumber = (phoneNumber: string) => {
  const mobilePhonePattern = /^\+\d{1,2} \d{1,2} [0-9]{4}-[0-9]{4}$/;

  if (!mobilePhonePattern.test(phoneNumber)) {
    throw new Error('Invalid phone number.');
  }

  return true;
};
