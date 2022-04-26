import DB from '../../../lib/connectDb';
import Post from '../../../models/Post';
DB();
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      return getPosts(req, res);
    case 'POST':
      return createPost(req, res);
    case 'PUT':
      return editPost(req, res);
    default:
      res.status(400).json({ message: 'error en el método' });
  }
}

const getPosts = async (req, res) => {
  const datos = await Post.findById('62670b9a2b7c97b3bc11ab73');

  const info = datos.info;

  res.status(202).json({ data: datos, u: info });
};

const createPost = async (req, res) => {
  try {
    const cuerpo = req.body;
    const newPost = new Post(cuerpo);
    const nuevo = await newPost.save();
    res
      .status(200)
      .json({ message: 'creating new post', cuerpo: cuerpo, res: nuevo });
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Pedazo de mierda, está mal', error: error });
  }
};

const editPost = async (req, res) => {
  try {
    const { _id, tituloEntrada } = req.body;
    const elemento = await Post.findById(_id);
    if (elemento) {
      console.log('SAI', elemento);
      const resultado = await Post.updateOne({ _id }, { tituloEntrada });
      console.log('RRRR', resultado);

      res.status(200).json({ message: resultado });
    } else {
      res.status(302).json({ message: 'No existe' });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
