import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginService, PayloadEmployee } from '../../../Services/LoginService';
import { UserContext, UserContextType } from '../../Contexts/UserContext';
import {RoutePath} from "../../Routes/RoutesEnum"
  
export default function LoginPage() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    const userContextObject = useContext(UserContext)

    async function onSubmitForm() {
      const responseData = await LoginService.add({username, password})
      userContextObject?.saveUser(responseData.token)
      console.log("Logged in with token" + responseData.token)
      navigate("/")
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Email</FormLabel>
                <Input type="name" 
                  value={username}
                  onChange={(
                      ev: React.ChangeEvent<HTMLInputElement>,
                  ): void => setUsername(ev.target.value)} 
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input type="password" 
                  value={password}
                  onChange={(
                      ev: React.ChangeEvent<HTMLInputElement>,
                  ): void => setPassword(ev.target.value)} 
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={onSubmitForm}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }