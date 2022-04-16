import DB from '../../../lib/connectDb';
import Partido from '../../../models/Partido';

DB();
export default async function handler(req, res) {
  //console.log(req.method);
  switch (req.method) {
    case 'GET':
      return getPartidos(req, res);

    default:
      res.status(400).json({ message: 'bad request polla' });
  }
  //res.status(200).json({ equipos });
}

const getPartidos = async (req, res) => {
  const partidos = await Partido.find({});
  return res.status(200).json(partidos);
};
