import DB from '../../../lib/connectDb';
import Equipo from '../../../models/Equipo';

DB();
export default async function handler(req, res) {
  //console.log(req.method);
  switch (req.method) {
    case 'GET':
      return getEquipos(req, res);

    default:
      res.status(400).json({ message: 'bad request polla' });
  }
  //res.status(200).json({ equipos });
}

const getEquipos = async (req, res) => {
  const equipos = await Equipo.find();
  return res.status(200).json(equipos);
};
