import bcrypt from 'bcrypt';
import { getSession } from 'next-auth/react';
import DB from '../../../lib/connectDb';
import Users from '../../../models/userModel';
DB();
async function handler(req, res) {
  //console.log(req.body);
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: 'NOT autenticated' });
    return;
  }
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const user = await Users.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const currentPassword = user.password;

  const isMatch = await bcrypt.compare(oldPassword, currentPassword);
  if (!isMatch) {
    res.status(403).json({ message: 'La contraseña está errada' });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(newPassword, salt);

  const constupdatedUser = await Users.findOneAndUpdate(
    { email: userEmail },
    { password: hashpass }
  );

  res.status(200).json({ message: 'Pasword Updated' });
}

export default handler;
