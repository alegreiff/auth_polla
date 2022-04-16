export const cargaEquipos = async () => {
  const equipos = await fetch('/api/polla/equipos');
  const data = await equipos.json();
  if (data) {
    return data;
  }
};
