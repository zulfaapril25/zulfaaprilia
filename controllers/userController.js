const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger  = require('../logger.js')
const { generateToken } = require('../helpers/jwt.js')

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailUsed = await User.findOne({
      where: { email }
    });

    if (emailUsed) {
      return res.status(400).json({ name: 'bad request', message: "email sudah digunakan" });
    }

    // Hash the password asynchronously
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    // Don't send the hashed password in the response
    delete user.password;
    logger.info('Akun berhasil dibuat', { username, email });
    res.status(201).json({ message: 'akun berhasil dibuat, silahkan login.' });
  } catch (error) {
    logger.error('Terjadi kesalahan saat registrasi', { error });
    res.status(500).json({ message: 'Terjadi kesalahan saat membuat akun.' });
  }
};


const login = async (req, res) => {
  try{
  const { email, password } = req.body;

  const user = await User.findOne({ 
    where: { email }
   })

   if (!user){
    logger.warn('Autentikasi gagal. Salah menginput email / password', { email });
    return res.status(401).json({ message: 'Authentication failed. Salah menginput email / password .' });
   }
       
   const PasswordMatch = await bcrypt.compare(password, user.password);
   if (!PasswordMatch) {
     return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
   }
        
    //generateToken
    token = generateToken({ userId: user.id, email: user.email });

    logger.info('User berhasil login', { userId: user.id, email: user.email });
    return res.status(200).json({ message: 'User successfully login.', token: token})

  } catch(error){
      logger.error('Internal Server Error', { error });
      res.status(500).json({ message: 'Internal Server Error' });
    };
};

module.exports = { register, login }