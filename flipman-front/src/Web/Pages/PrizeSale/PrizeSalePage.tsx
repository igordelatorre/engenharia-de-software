import { useState, FormEvent } from "react"
import Prize from "../../../Domain/Prize"
import { CenteredContentContainer, ContentContainer, HorizontalCenteredContainer, PageContainer } from "../../Styles/style"
import { Input, Button } from '@chakra-ui/react'

enum PageState {
    CARD,
    TABLE
}

function PrizeSalePage() {
    const [selectedPrize, setSelectedPrize] = useState<Prize>()
    const [playerCard, setPlayerCard] = useState<string | null>("")
    const [pageState, setPageState] = useState<PageState>(PageState.CARD)


    function handleSubmitPlayerCard() {
        setPageState(PageState.TABLE)
    }

    return (
        <PageContainer>
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
                    <h1>Prizes que o {playerCard} pode comprar</h1>
                )}
            </CenteredContentContainer>
                
        </PageContainer>
    )
}
export default PrizeSalePage