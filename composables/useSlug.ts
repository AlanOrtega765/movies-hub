const useSlug = (text: string) => {
  let slug = text.toLowerCase().split(' ').join('-');

  if (slug.includes('---')) {
    slug = slug.split('---').join('-');
  }

  const pattern = /[\u0300-\u036f^*@!"#$%:.&/()=?¡!¿']/g;
  slug = slug.normalize('NFD').replace(pattern, '');

  return slug;
};

export default useSlug;
