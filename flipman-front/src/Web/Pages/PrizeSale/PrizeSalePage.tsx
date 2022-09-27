import { useState, FormEvent } from "react"
import Prize from "../../../Domain/Prize"
import { CenteredContentContainer, ContentContainer, HorizontalCenteredContainer, PageContainer, PageTitle, PageTitleContainer } from "../../Styles/style"
import { Input, Button } from '@chakra-ui/react'
import PrizesTable from "./Table/PrizesTable"
import Player from "../../../Domain/Player"

enum PageState {
    CARD,
    TABLE
}

function PrizeSalePage() {
    const [selectedPrize, setSelectedPrize] = useState<Prize>()
    const [playerCard, setPlayerCard] = useState<string | null>("")
    const [pageState, setPageState] = useState<PageState>(PageState.CARD)
    const [player, setPlayer] = useState<Player>()

    const tempPlayer : Player = {
        card: "00323753",
        email: "basilveira@inf.ufrgs.br",
        id: 5,
        name: "Bruno Silveira",
        tickets: 50,
        tokens: 2
    }
    const prizes : Array<Prize> = [
        {
            id: 0,
            name: "Pirulito",
            amount: 8,
            price: 2
        },
        {
            id: 1,
            name: "Iôiô",
            amount: 2,
            price: 15
        },
        {
            id: 2,
            name: "Xadrez",
            amount: 1,
            price: 80
        },
        {
            id: 3,
            name: "Aboeba",
            amount: 0,
            price: 30
        },
    ]

    function sellPrize(player: Player, prize : Prize, amount : number) {
        console.log(`Vendido ${amount} unidade(s) de ${prize.name} para ${player.name}`)
    }


    function handleSubmitPlayerCard() {
        setPageState(PageState.TABLE)
        // Aqui vai a requisição depois pra pegar o player com cartão {playerCard}
        setPlayer(tempPlayer)
    }

    return (
        <PageContainer>
            <PageTitleContainer>
              <PageTitle>Trocar prêmios</PageTitle>
            </PageTitleContainer>
            <CenteredContentContainer>
                {pageState === PageState.CARD && (
                    <HorizontalCenteredContainer>
                        <form onSubmit={handleSubmitPlayerCard}>
                            <Input width="50vw" placeholder={"Cartão do jogador"} onChange={(e : FormEvent<HTMLInputElement>) => {setPlayerCard(e.currentTarget.value)}}/>
                            <Button type="submit">Buscar</Button>
                        </form>
                    </HorizontalCenteredContainer>
                )}
                {pageState === PageState.TABLE && (
                    <>
                        <h1>Jogador: {player?.name}</h1>
                        <h1>Saldo: {player?.tickets}</h1>
                        {player &&
                            <PrizesTable
                                player={player}
                                sellPrize={sellPrize}
                                prizes={prizes}
                            />
                        }
                    </>
                )}
            </CenteredContentContainer>
                
        </PageContainer>
    )
}
export default PrizeSalePage