import { format } from 'date-fns';

const useFormatDate = (date) => {
  const newDate = date.split('-').join(',');
  const formattedDate = format(new Date(newDate), 'dd/MM/yyyy');
  return formattedDate;
};

export default useFormatDate;
