import EntityError from '../../../Domain/EntityError'
import Machine from '../../../Domain/Machine'

function validate(machine: Partial<Machine>) {
	const errors: EntityError<Machine> = {}
    
    if (!machine.name) errors.name = 'Obrigatório'
    if (!machine.playCost) errors.playCost = 'Obrigatório'
    if (!machine.pointsPerTicket) errors.pointsPerTicket = 'Obrigatório'

	return errors
}

export default validate
