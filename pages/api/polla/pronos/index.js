import DB from '../../../../lib/connectDb';
import Prono from '../../../../models/Prono';
DB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      return guardaPronos(req, res);

    case 'GET':
      return cargaPronos(req, res);

    default:
      return res.status(400).json({ message: 'Método NO soportado' });
  }
}

const cargaPronos = async (req, res) => {
  const pronos = await Prono.find();
  if (pronos) {
    res.status(200).json({ pronos });
  }
};
const guardaPronos = async (req, res) => {
  const datosPrevios = req.body;
  //console.log(datosPrevios);
  const datosFinales = datosPrevios.numPartidos.map((dato) => {
    return {
      match: dato.partido,
      comodin: dato.comodin,
      pollero: datosPrevios.ID,
      mloc: dato.mloc,
      mvis: dato.mvis,
    };
  });

  //CUANTOS PRONOS TIENE ESTE ID

  /* PARA CADA PRONO: 
  ¿EXISTE?
  SI CANCELA
  NO SE CREA



  */

  try {
    const sale = await Prono.insertMany(datosFinales, { ordered: false });
    /* datosFinales.forEach(async (prono) => {
      const nuevoProno = new Prono(prono);
      let salida = '';
      const existe = await Prono.find({
        match: prono.match,
        pollero: prono.pollero,
      });

      if (!existe) {
        await nuevoProno.save();
      }
    }); */
    console.log(sale);
    res.status(200).json({ message: sale });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ success: false, error: error });
  }
};
