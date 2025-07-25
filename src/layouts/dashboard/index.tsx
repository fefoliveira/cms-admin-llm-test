import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Rule, MonetizationOn, People, Assessment, History } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { useWhitelabelStore } from 'src/store/whitelabel.store';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const NAVIGATION_ITEMS = [
  {
    title: 'Regras',
    path: paths.dashboard.rules.root,
    icon: <Rule />,
  },
  {
    title: 'Taxas de Conversão',
    path: paths.dashboard.conversionRate.root,
    icon: <MonetizationOn />,
  },
  {
    title: 'Usuários',
    path: paths.dashboard.users.root,
    icon: <People />,
  },
  {
    title: 'Variáveis',
    path: paths.dashboard.variables,
    icon: <Assessment />,
  },
  {
    title: 'Logs de Admin',
    path: paths.dashboard.adminLogs,
    icon: <History />,
  },
];

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { siteName, logo } = useWhitelabelStore();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {logo && (
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 32, width: 32 }}
            />
          )}
          <Typography variant="h6" noWrap component="div">
            {siteName}
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {NAVIGATION_ITEMS.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CMS Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}