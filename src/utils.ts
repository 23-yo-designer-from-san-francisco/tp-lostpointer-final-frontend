// Проверка объекта на пустоту (ded inside)
export const isEmpty = (object: any): boolean => {
  for(const i in object) {
    return true;
  }
  return false;
};

export const makeid = (length: number) => {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
