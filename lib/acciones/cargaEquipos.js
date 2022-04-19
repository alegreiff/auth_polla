export const cargaEquipos = async () => {
  if (typeof window !== 'undefined') {
    const equipos = await fetch('/api/polla/equipos');
    const data = await equipos.json();
    if (data) {
      return data;
    }
  }
};
