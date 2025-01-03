const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);

  if (!authHeader){
    return res.status(401).json({ error: 'Token não informado.'})
  }
  const [, token] = authHeader.split(' ');
  
  try{
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;

    //console.log(decoded);
  }catch(err){
    return res.status(401).json({ error: 'Token inválido. ' + err})
  }
  return next(); 
  
}
