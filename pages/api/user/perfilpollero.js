import Pollero from '../../../models/polleroModel';
import User from '../../../models/userModel';
import DB from '../../../lib/connectDb';
DB();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      return creaPerfil(req, body, res);
    case 'GET':
      return getPerfil(req, res);

    default:
      return res.status(400).json({ msg: 'Método no soportado' });
  }
}
const creaPerfil = async (req, body, res) => {
  try {
    const { usuario } = body;
    const pollero = await Pollero.findOne({ usuario: usuario });
    const userIsValid = await User.findById(body.usuario);
    if (!userIsValid) {
      return res.status(400).json({ message: 'Usuario inexistente' });
    }

    if (pollero) {
      return res.status(403).json({ message: 'Ya existe el perfil' });
    } else {
      const newPollero = new Pollero({
        hincha: body.hincha,
        usuario: body.usuario,
      });
      const nuevo = await newPollero.save();

      return res.status(201).json({ message: 'Vamos bien', pollero: nuevo });
    }
  } catch (error) {
    muestraError(res, error, 'creando perfil');
  }
};

const getPerfil = async (req, res) => {
  return res.status(200).json({ message: 'Todo monocuco' });
};

const muestraError = (res, error, place = 'desconocido') => {
  return res.status(500).json({ place, message: error.message });
};
