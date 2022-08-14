import EntityError from '../../../Domain/EntityError'
import Player from '../../../Domain/Player'

function validate(player: Partial<Player>) {
	const errors: EntityError<Player> = {}


    if (!player.name) errors.name = 'Obrigatório'
    if (player.name)
    {
        
    }
    if (!player.email) errors.email = 'Obrigatório'
    if (!player.cellphone) errors.cellphone = 'Obrigatório'
    if (!player.card) errors.card = 'Obrigatório'

	return errors
}

export default validate
