//const ObjectId = require('mongoose').Types.ObjectId;
import mongoose from 'mongoose';

export const cargaPerfil = async (userId) => {
  const ObjectID = mongoose.Types.ObjectId;
  if (!ObjectID.isValid(userId)) {
    return;
  }
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  if (data) {
    return data;
  }
};
