import EntityError from '../../../Domain/EntityError'
import Prize from '../../../Domain/Prize'

function validate(prize: Partial<Prize>) {
	const errors: EntityError<Prize> = {}
    
    if (!prize.name) errors.name = 'Obrigatório'
    if (!prize.price) errors.price = 'Obrigatório'
    if (!prize.amount) errors.amount = 'Obrigatório'

	return errors
}

export default validate
