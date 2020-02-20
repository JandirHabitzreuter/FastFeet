import Sequelize, { Model } from 'sequelize';
// criptografar senha gerando um hash
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            sequelize
        );
        // Vai ser executado antes de do usuário ser criado
        this.addHook('beforeSave', async user => {
            if (user.password) {
                // vai criptografar a senha com bcrypt
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
