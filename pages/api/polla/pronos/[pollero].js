import DB from '../../../../lib/connectDb';
import Prono from '../../../../models/Prono';
DB();

export default async function handler(req, res) {
  const { method } = req;

  const { pollero } = req.query;

  if (pollero === undefined) {
    res.status(403).json({ message: 'ERROR CARGANDO' });
  }
  switch (method) {
    case 'GET':
      return cargaPronos(req, res, pollero);

    default:
      return res.status(400).json({ message: 'Método NO soportado' });
  }
}

const cargaPronos = async (req, res, pollero) => {
  try {
    const pronosUser = await Prono.find({
      pollero: pollero,
    });
    if (pronosUser) {
      res.status(201).json({ message: pronosUser.length, pronos: pronosUser });
    }
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};
