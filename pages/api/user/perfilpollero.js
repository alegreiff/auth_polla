import Pollero from '../../../models/polleroModel';
import DB from '../../../lib/connectDb';
DB();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      return creaPerfil(req, body, res);

    default:
      return res.status(400).json({ msg: 'Método no soportado' });
  }
}
const creaPerfil = async (req, body, res) => {
  try {
    const { usuario } = body;
    const pollero = await Pollero.findOne({ usuario: usuario });
    if (pollero) {
      return res.status(400).json({ message: 'Ya existe el perfil' });
    } else {
      const newPollero = new Pollero({
        hincha: 'Independiente Santa Fe',
        usuario: body.usuario,
      });
      const nuevo = await newPollero.save();

      return res.status(201).json({ message: 'Vamos bien', pollero: nuevo });
    }
  } catch (error) {
    muestraError(res, error, 'creando perfil');
  }
};

const muestraError = (res, error, place = 'desconocido') => {
  return res.status(500).json({ place, err: error.message });
};
