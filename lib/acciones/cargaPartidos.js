//import DB from '../../lib/connectDb';
//import Partido from '../../models/Partido';

//DB();

export const cargaPartidos = async () => {
  const partidos = await fetch('/api/polla/partidos');
  const data = await partidos.json();
  if (data) {
    return data;
  }
};
