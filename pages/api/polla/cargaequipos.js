import DB from '../../../lib/connectDb';
import { equipos } from '../../../lib/settings';
import Equipo from '../../../models/Equipo';

DB();

export default async function handler(req, res) {
  //await dbConnect();

  const { method } = req;
  switch (method) {
    case 'GET':
      await Equipo.deleteMany();
      //res.status(201).json({ message: 'Borrada hasta la madre' });

      try {
        equipos.forEach(async (eq) => {
          const group = eq.pos.charAt(0);
          eq.grupo = group;
          const nuevoEquipo = new Equipo(eq);
          //console.log(nuevoEquipo);
          await nuevoEquipo.save();
        });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Error de solicitud' });
      }

    default:
      res.status(500).json({ success: false, error: 'No existe' });
  }
  //res.status(200).json({ equipos });
}
