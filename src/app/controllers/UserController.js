const User = require('../../db/models/User');
const Yup = require('yup');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    })

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    //user.log(userExists);

    if (userExists !== null) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });    
  }

  async update(req, res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string()
        .required()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) => 
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    })

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if(email !== user.email){
      const userExists = await User.findOne({ where: { email } });    

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }

    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(400).json({ error: 'Senha inválida.' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      user: {
        id,
        name,
        email,
      },
    });
  }
}

module.exports = new UserController();