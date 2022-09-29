import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {useState, useEffect} from 'react'
import User from '../../../Domain/User';

export default function Success() {

  const [user, setUser] = useState<User>({id: 1, name: 'joao', password: '123', email: 'joao@email.com', isAdmin: true})


  useEffect(() => {    
    // GET SELF AQUI
    //setUser(self)
  }, []);


  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Bem vindo, {user.name}!
      </Heading>
    </Box>
  );
}