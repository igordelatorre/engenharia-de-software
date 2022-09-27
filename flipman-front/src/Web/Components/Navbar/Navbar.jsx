import * as React from 'react';
import {AppBar} from 'material-ui-core';
import {Box} from 'material-ui-core';
import {Toolbar} from 'material-ui-core';
import {IconButton} from 'material-ui-core';
import {Typography} from 'material-ui-core';
import {Menu} from 'material-ui-core';
import {Container} from 'material-ui-core';
import {Button} from 'material-ui-core';
import {MenuItem} from 'material-ui-core';
import { UserAuth } from '../../../Domain/User.ts';
import {useNavigate} from "react-router-dom"
import {NavItemText} from "./style.ts"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
 


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate()

   //Depois será trocado pra pegar o user logado
   const userAuth = UserAuth.DEVELOPER


   function logout() {
    console.log("logout!")
  }
  
  const pages = [
    {text: "Jogadores", path: "/players", auth: [UserAuth.EMPLOYEE]},
    {text: "Consultar Jogador", path: "/playerStats", auth: [UserAuth.NO_AUTH]},
    {text: "Trocar prêmios", path: "/prizeSale", auth: [UserAuth.EMPLOYEE]},
    {text: "Gerenciar prêmios", path: "/prizes", auth: [UserAuth.MANAGER]},
    {text: "Máquinas", path: "/machines", auth: [UserAuth.MANAGER]}
  ]
  const settings = [{text: 'Logout', onClick: logout()}]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton>
            <VideogameAssetIcon fontSize='large'/>
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <>
              {(page.auth.includes(userAuth) || userAuth === UserAuth.DEVELOPER) && (
                <Button
                key={page}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                <Typography variant="h5">
                  {page.text}
                </Typography>
              </Button>)}
              </>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
