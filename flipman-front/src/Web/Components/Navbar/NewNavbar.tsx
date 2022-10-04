import { ReactNode, useContext } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import User, { UserAuth } from '../../../Domain/User';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';

const pages = [
  {text: "Jogadores", path: "/players", auth: [UserAuth.EMPLOYEE]},
  {text: "Jogadores", path: "/playersManager", auth: [UserAuth.MANAGER]},
  {text: "Consultar Jogador", path: "/playerStats", auth: [UserAuth.NO_AUTH]},
  {text: "Trocar prêmios", path: "/prizeSale", auth: [UserAuth.EMPLOYEE]},
  {text: "Prêmios", path: "/prizes", auth: [UserAuth.MANAGER]},
  {text: "Máquinas", path: "/machines", auth: [UserAuth.MANAGER]},
  {text: "Usuários", path: "/users", auth: [UserAuth.MANAGER]}
]
function NavLink ({ path, children }: { path: string; children: ReactNode }) {
  const navigate = useNavigate()
  return (
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
        cursor: "pointer"
      }}
      onClick={() => navigate(path)}
    >
      {children}
    </Box>
  );
} 

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const userContextObject = useContext(UserContext)
  const tempUserAuth: UserAuth | undefined = userContextObject?.getUser()?.auth
  let userAuth: UserAuth = UserAuth.NO_AUTH
  if (tempUserAuth !== undefined) {
    userAuth = tempUserAuth
  }

  function onLogout() {
    userContextObject?.logoutUser()
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <NavLink path="/">FLIPMAN</NavLink>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {pages.map((page, index) => (
                (page.auth.includes(userAuth) || userAuth === UserAuth.DEVELOPER) && <NavLink path={page.path} key={index}>{page.text}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
            {userAuth !== UserAuth.NO_AUTH && (
              <>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    />
                </MenuButton>
                <MenuList>
                  
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
               </>
                )}
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}