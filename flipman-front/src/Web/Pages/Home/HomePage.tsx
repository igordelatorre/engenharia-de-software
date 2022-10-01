import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {useState, useEffect, useContext} from 'react'
import User from '../../../Domain/User';
import { UserContext } from '../../Contexts/UserContext';

export default function HomePage() {

  //const [user, setUser] = useState<User>({id: 1, name: 'joao', email: 'joao@email.com', password: '123', isAdmin: true})
  const userContextObject = useContext(UserContext)
  const user = userContextObject?.getUser()

  useEffect(() => {    
    // GET SELF AQUI
    //setUser(self)
  }, []);


  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Bem vindo, {user?.name}!
      </Heading>
    </Box>
  );
}