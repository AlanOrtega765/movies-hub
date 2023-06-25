const useFormatRuntime = (minutes: number) => {
  var hours = Math.floor(minutes / 60); // Obtiene la parte entera de la división
  var minutesLeft = minutes % 60; // Obtiene los minutos restantes después de la división

  return hours + " hrs. " + minutesLeft + " min.";
};

export default useFormatRuntime;