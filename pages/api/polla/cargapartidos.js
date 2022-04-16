import DB from '../../../lib/connectDb';
import { finalPartidos } from '../../../lib/settings/partidos';
import Partido from '../../../models/Partido';

DB();
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        finalPartidos.forEach(async (partido) => {
          const nuevoPartido = new Partido(partido);
          //console.log(nuevoPartido);
          await nuevoPartido.save();
        });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Error de solicitud' });
      }

    default:
      res.status(500).json({ success: false, error: 'No existe' });
  }
  //res.status(200).json({ equipos });
}
