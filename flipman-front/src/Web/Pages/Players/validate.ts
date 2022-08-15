import EntityError from '../../../Domain/EntityError'
import Player from '../../../Domain/Player'
import PlayerService from '../../../Service/PlayerService'

function validate(player: Partial<Player>) {
	const errors: EntityError<Player> = {}
    const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      )
    
    const isValidCard = async () => {
        const players = await PlayerService.getAll()
        const isUnique = players.results.find(p => p.card == player.card) || false
    }
    
    if (!player.name) errors.name = 'Obrigatório'
    if (!player.email) errors.email = 'Obrigatório'
    if (player.email && !emailRegexp.test(player.email)) errors.email = 'Formato Inválido'
    if (!player.card) errors.card = 'Obrigatório'
    if (player.card && !isValidCard()) errors.card = 'Número de Cartão já utilizado'

	return errors
}

export default validate
