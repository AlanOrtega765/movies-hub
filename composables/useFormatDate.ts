const useFormatDate = (date: string) => {
  const formatDate = new Date(date);
  const day = formatDate.getUTCDate();
  const month = formatDate.getUTCMonth() + 1;
  const year = formatDate.getUTCFullYear();

  if (day < 10 && month < 10) {
    return `0${day}/0${month}/${year}`;
  }
  
  if (day < 10) {
    return `0${day}/${month}/${year}`;
  }

  if (month < 10) {
    return `${day}/0${month}/${year}`;
  }


  return `${day}/${month}/${year}`;
};

export default useFormatDate;
