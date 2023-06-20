const useSlug = (text) => {
  let slug = text.toLowerCase().split(' ').join('-');
  const pattern = /[\u0300-\u036f^*@!"#$%:.&/()=?¡!¿']/g;
  slug = slug.normalize('NFD').replace(pattern, '');

  return slug;
};

export default useSlug;