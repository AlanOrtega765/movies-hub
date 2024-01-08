export const useUtils = () => {
  const getVotePercentage = (vote_average: number) => {
    const percentage = vote_average * 10;
    return `${percentage}%`;
  };

  const languageByISO = (
    iso_language: string | undefined,
    languages: object | any
  ) => {
    if (iso_language) return languages[iso_language];

    return null;
  };

  const formatToSlug = (text: any) => {
    let pattern = /[\^*@!"#$%&/()=?¡!:¿'\\]/gi;
    let formatted = text.replace(pattern, '').toLocaleLowerCase();
    let slug = formatted.split(' ').join('-');

    return slug;
  };

  const formatVoteAverage = (vote_average: number) => {
    const _voteAverage = ((vote_average / 10) * 5).toFixed(2);
    return _voteAverage;
  };

  const formatRuntime = (runtime: number) => {
    if (runtime) {
      const hours = Math.floor(runtime / 60);
      let minutes = (runtime % 60).toString();

      minutes = minutes < '10' ? '0' + minutes : minutes;

      return hours + 'hrs' + ' ' + minutes + 'min';
    }

    return null;
  };

  const formatToCurrency = (currency: number) => {
    if (currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(currency);
    }

    return null;
  };

  const formatDate = (date: string) => {
    if (date) {
      const _date = new Date(date);
      const day = _date.getDate();
      const month = _date.getUTCMonth() + 1;
      const year = _date.getUTCFullYear();

      if (day < 10) return `0${day}/${month}/${year}`;

      if (month < 10) return `${day}/0${month}/${year}`;

      if (day < 10 && month < 10) return `0${day}/0${month}/${year}`;

      return `${day}/${month}/${year}`;
    }

    return null;
  };

  return {
    getVotePercentage,
    formatVoteAverage,
    formatRuntime,
    formatDate,
    formatToCurrency,
    languageByISO,
    formatToSlug
  };
};
