import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientsController {
    async store(req, res) {
        const schema = Yup.object().shape({
            // .required = obrigatorio
            name: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            complemento: Yup.string().required(),
            estado: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const recipExists = await Recipient.findOne({
            where: { name: req.body.name },
        });

        if (recipExists) {
            return res.status(400).json({ error: 'Recipient already exists.' });
        }

        const { name } = await Recipient.create(req.body);

        return res.json({
            name,
        });
    }
}

export default new RecipientsController();
