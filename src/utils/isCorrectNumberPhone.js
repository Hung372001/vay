export default function isVietnamesePhoneNumber(number) {
  return /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9]|87)[0-9]{7}$/.test(number);
}