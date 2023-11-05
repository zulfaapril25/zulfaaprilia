const { verifyToken } = require("../helpers/jwt.js");
const { User } = require("../models");

const authUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth?.slice(7);

    if (!token) {
      return res.status(401).json({ name: 'unauthorized', message: 'user tidak punya akses' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ name: 'unauthorized', message: 'user tidak punya akses' });
    }

    const user = await User.findOne({
      where: { email: decoded?.email },
    });
    if (!user) {
      return res.status(401).json({ name: 'unauthorized', message: 'user tidak punya akses' });
    }

    req.authUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'user tidak terautentikasi' });
  }
};

module.exports = { authUser };
