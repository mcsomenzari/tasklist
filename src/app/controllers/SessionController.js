const jwt = require('jsonwebtoken');
const User = require('../../db/models/User');
const auth = require('../../config/auth');

class SessionController{
  async store(req, res){
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    //console.log(user);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não existe.' });
    }

    // Verificar o hash
    if(!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),      
    });    
  }


}

module.exports = new SessionController();