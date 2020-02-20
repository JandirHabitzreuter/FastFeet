// Gerar um token para validação do user na sessão
import jwt from 'jsonwebtoken';

// Validação de campos
import * as Yup from 'yup';
import User from '../models/User';

// vai contar o token do usuário
import auth from '../../config/auth';

class SessionController {
    async store(req, res) {
        // criar o esquema esperado pelo body
        const schema = Yup.object().shape({
            email: Yup.string().email(),
            password: Yup.string().required(),
        });

        // se vier diferente do esperado vai dar erro de validação
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        // recuperar o usuario pelo body
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        // se usuário não existir vai dar erro
        if (!user) {
            return res.status(401).json({ error: 'User not found!' });
        }

        // usar o checkPassord para validar a senha do usuáro, vai comparar o hash gerado
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Password not match!' });
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

export default new SessionController();
