import Pollero from '../../../models/polleroModel';
import DB from '../../../lib/connectDb';
DB();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case 'GET':
      return getPerfil(req, res);

    default:
      return res.status(400).json({ msg: 'Método no soportado' });
  }
}

const getPerfil = async (req, res) => {
  const { perfil } = req.query;
  const perfilPollero = await Pollero.findOne({ usuario: perfil });

  return res.status(200).json({ perfil: perfilPollero });
};

const muestraError = (res, error, place = 'desconocido') => {
  return res.status(500).json({ place, message: error.message });
};
