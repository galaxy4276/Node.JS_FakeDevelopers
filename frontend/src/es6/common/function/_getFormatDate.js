export const getFormatDate = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month <= 10 ? month + '0' : month;
  let day = date.getDate();
  day = day <= 10 ? '0' + day : day;

  return `${year}-${month}-${day}`;
};
