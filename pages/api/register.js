import bcrypt from 'bcrypt';

import Users from '../../models/userModel';

export default async function handler(req, res) {
  const body = req.body;
  const { name, email, password } = req.body;

  //console.log('BACKEND', name, email, password);
  const user = await Users.findOne({ email: email });
  if (user) {
    res.status(200).json({ message: 'Usuario ya registrado' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(password, salt);
  const newuser = new Users({
    email,
    password: hashpass,
    name,
  });
  await newuser.save();
  res.status(200).json({ message: 'Registro etsitoso' });
}

/* 
.then((doc) => res.status(201).send(doc));
*/
