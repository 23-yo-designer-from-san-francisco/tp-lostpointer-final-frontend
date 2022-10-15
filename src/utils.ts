// Проверка объекта на пустоту (ded inside)
export const isEmpty = (object: any): boolean => {
  for(const i in object) {
    return true;
  }
  return false;
};
