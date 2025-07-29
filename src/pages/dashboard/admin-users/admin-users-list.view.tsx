import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Table,
  Button,
  Avatar,
  Chip,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  PersonAdd as PersonAddIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useAdminUsersStore } from "../../../store/adminUsers.store";
import { AdminUser } from "../../../types/admin-user";
import { paths } from "../../../routes/paths";
import { PermissionGuard } from "../../../components/permission-guard";
import { usePermissions } from "../../../hooks/use-permissions";

const ROLE_LABELS = {
  super_admin: "Super Admin",
  admin: "Administrador",
  moderator: "Moderador",
  viewer: "Visualizador",
};

const ROLE_COLORS = {
  super_admin: "error",
  admin: "primary",
  moderator: "warning",
  viewer: "default",
} as const;

export default function AdminUsersListView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { canCreate, canEdit, canDelete } = usePermissions();

  const {
    loading,
    filters,
    selectedUser,
    fetchAdminUsers,
    deleteAdminUser,
    toggleUserStatus,
    setFilters,
    setSelectedUser,
    getFilteredUsers,
    clearFilters,
  } = useAdminUsersStore();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  const filteredUsers = getFilteredUsers();
  const currentRoute = paths.dashboard.adminUsers.root;

  useEffect(() => {
    fetchAdminUsers();
  }, [fetchAdminUsers]);

  const handleCreateUser = () => {
    navigate(paths.dashboard.adminUsers.create);
  };

  const handleEditUser = (userId: string) => {
    navigate(paths.dashboard.adminUsers.edit.replace(":id", userId));
  };

  const handleManagePermissions = (userId: string) => {
    navigate(paths.dashboard.adminUsers.permissions.replace(":id", userId));
  };

  const handleDeleteClick = (user: AdminUser) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      await deleteAdminUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    await toggleUserStatus(userId);
  };

  const handleFilterChange = (
    field: string,
    value: string | boolean | undefined
  ) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const getStatusChip = (isActive: boolean) => (
    <Chip
      label={isActive ? "Ativo" : "Inativo"}
      color={isActive ? "success" : "error"}
      size="small"
      variant="outlined"
    />
  );

  const getRoleChip = (role: AdminUser["role"]) => (
    <Chip
      label={ROLE_LABELS[role]}
      color={ROLE_COLORS[role]}
      size="small"
      variant="filled"
    />
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Usuários Administradores
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gerencie usuários administradores e suas permissões
            </Typography>
          </Box>

          <PermissionGuard route={currentRoute} action="create">
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleCreateUser}
              sx={{ minWidth: { xs: "auto", sm: 140 } }}
            >
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Novo Admin
              </Box>
            </Button>
          </PermissionGuard>
        </Stack>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              size="small"
              placeholder="Buscar por nome ou email..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.disabled" }} />
                ),
              }}
              sx={{ minWidth: { xs: "100%", md: 300 } }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Papel</InputLabel>
              <Select
                value={filters.role || ""}
                label="Papel"
                onChange={(e) =>
                  handleFilterChange("role", e.target.value || undefined)
                }
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="super_admin">Super Admin</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="moderator">Moderador</MenuItem>
                <MenuItem value="viewer">Visualizador</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={
                  filters.isActive === undefined
                    ? ""
                    : filters.isActive.toString()
                }
                label="Status"
                onChange={(e) => {
                  const value = e.target.value;
                  handleFilterChange(
                    "isActive",
                    value === "" ? undefined : value === "true"
                  );
                }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="true">Ativo</MenuItem>
                <MenuItem value="false">Inativo</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={1}>
              <Tooltip title="Limpar Filtros">
                <IconButton onClick={handleClearFilters} size="small">
                  <FilterIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Atualizar">
                <IconButton onClick={fetchAdminUsers} size="small">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Papel</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Último Login</TableCell>
                <TableCell>Criado em</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography>Carregando...</Typography>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Nenhum usuário encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.05
                        ),
                      },
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          sx={{ width: 40, height: 40 }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" noWrap>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {user.id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>

                    <TableCell>{getRoleChip(user.role)}</TableCell>

                    <TableCell>{getStatusChip(user.isActive)}</TableCell>

                    <TableCell>
                      {user.lastLogin ? (
                        <Typography variant="body2">
                          {format(
                            new Date(user.lastLogin),
                            "dd/MM/yyyy HH:mm",
                            { locale: ptBR }
                          )}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.disabled">
                          Nunca
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {format(new Date(user.createdAt), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="flex-end"
                      >
                        <PermissionGuard route={currentRoute} action="edit">
                          <Tooltip title="Editar">
                            <IconButton
                              size="small"
                              onClick={() => handleEditUser(user.id)}
                              color="primary"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </PermissionGuard>

                        <PermissionGuard route={currentRoute} action="edit">
                          <Tooltip title="Gerenciar Permissões">
                            <IconButton
                              size="small"
                              onClick={() => handleManagePermissions(user.id)}
                              color="secondary"
                            >
                              <SecurityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </PermissionGuard>

                        <PermissionGuard route={currentRoute} action="edit">
                          <Tooltip
                            title={user.isActive ? "Desativar" : "Ativar"}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleToggleStatus(user.id)}
                              color={user.isActive ? "warning" : "success"}
                            >
                              {user.isActive ? (
                                <BlockIcon fontSize="small" />
                              ) : (
                                <CheckCircleIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </PermissionGuard>

                        <PermissionGuard route={currentRoute} action="delete">
                          <Tooltip title="Excluir">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(user)}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </PermissionGuard>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o usuário{" "}
            <strong>{userToDelete?.name}</strong>? Esta ação não pode ser
            desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
