import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Container,
} from "@mui/material";
import {
  Rule,
  MonetizationOn,
  People,
  Assessment,
  History,
  Security,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile, useIsTablet } from "../../hooks/use-mobile";
import { usePermissions } from "../../hooks/use-permissions";
import { PermissionGuard } from "../../components/permission-guard";
import { paths } from "../../routes/paths";
import Header from "./header";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_MOBILE = 240;

const NAVIGATION_ITEMS = [
  {
    title: "Regras",
    path: paths.dashboard.rules.root,
    icon: <Rule />,
  },
  {
    title: "Taxas de Conversão",
    path: paths.dashboard.conversionRate.root,
    icon: <MonetizationOn />,
  },
  {
    title: "Admins",
    path: paths.dashboard.adminUsers.root,
    icon: <Security />,
  },
  {
    title: "Variáveis",
    path: paths.dashboard.variables,
    icon: <Assessment />,
  },
  {
    title: "Logs de Admin",
    path: paths.dashboard.adminLogs,
    icon: <History />,
  },
];

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { canViewPage } = usePermissions();

  const siteName = "CMS Admin";
  const logo = null;

  const drawerWidth = isMobile ? DRAWER_WIDTH_MOBILE : DRAWER_WIDTH;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: "100%",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {logo && (
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: { xs: 28, sm: 32 },
                width: { xs: 28, sm: 32 },
              }}
            />
          )}
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            noWrap
            component="div"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.25rem" },
              fontWeight: 600,
            }}
          >
            {siteName}
          </Typography>
        </Box>
      </Toolbar>
      <List sx={{ px: isMobile ? 1 : 2 }}>
        {NAVIGATION_ITEMS.filter((item) => canViewPage(item.path)).map(
          (item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
                sx={{
                  borderRadius: 1,
                  minHeight: { xs: 44, sm: 48 },
                  px: { xs: 1.5, sm: 2 },
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.primary.contrastText,
                    },
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: { xs: 36, sm: 40 },
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Header */}
      <Header onOpenDrawer={handleDrawerToggle} drawerWidth={drawerWidth} />

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundImage: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundImage: "none",
              borderRight: `1px solid ${theme.palette.divider}`,
            },
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
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3, md: 4 },
            maxWidth: { xl: "1400px" },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
