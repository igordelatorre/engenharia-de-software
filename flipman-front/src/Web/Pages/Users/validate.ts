import EntityError from '../../../Domain/EntityError'
import User from '../../../Domain/User'


function validate(user: Partial<User>) {
	const errors: EntityError<User> = {}
    const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      )
    
    
    if (!user.name) errors.name = 'Obrigatório'
    if (!user.password) errors.password = 'Obrigatório'
    if (user.email && !emailRegexp.test(user.email)) errors.email = 'Formato Inválido'

	return errors
}

export default validate
