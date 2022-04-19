export const cargaPartidos = async () => {
  if (typeof window !== 'undefined') {
    const partidos = await fetch('/api/polla/partidos');
    const data = await partidos.json();
    if (data) {
      return data;
    }
  }
};
