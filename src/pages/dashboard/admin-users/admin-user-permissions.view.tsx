import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  Stack,
  Button,
  Typography,
  Switch,
  IconButton,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Divider,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Security as SecurityIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

import { useAdminUsersStore } from "../../../store/adminUsers.store";
import { Permission, AdminUser } from "../../../types/admin-user";
import { paths } from "../../../routes/paths";

const PERMISSION_LABELS = {
  canView: "Visualizar",
  canCreate: "Criar",
  canEdit: "Editar",
  canDelete: "Excluir",
  canExport: "Exportar",
};

const ROLE_LABELS = {
  super_admin: "Super Administrador",
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

export default function AdminUserPermissionsView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const {
    adminUsers,
    updateUserPermissions,
    generatePermissionsForRole,
    getMenuStructure,
    fetchAdminUsers,
  } = useAdminUsersStore();

  const currentUser = adminUsers.find((u) => u.id === id);
  const menuStructure = getMenuStructure();

  useEffect(() => {
    if (!currentUser) {
      fetchAdminUsers();
    }
  }, [currentUser, fetchAdminUsers]);

  useEffect(() => {
    if (currentUser) {
      setPermissions([...currentUser.permissions]);
    }
  }, [currentUser]);

  const handlePermissionChange = (
    permissionId: string,
    field: keyof Permission,
    value: boolean
  ) => {
    const updatedPermissions = permissions.map((permission) => {
      if (permission.id === permissionId) {
        return { ...permission, [field]: value };
      }
      return permission;
    });

    setPermissions(updatedPermissions);
    setHasChanges(true);
  };

  const handleSavePermissions = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);
      await updateUserPermissions(currentUser.id, permissions);
      setHasChanges(false);
      navigate(paths.dashboard.adminUsers.root);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar permissões"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetToRoleDefaults = () => {
    if (!currentUser) return;

    const defaultPermissions = generatePermissionsForRole(currentUser.role);
    setPermissions(defaultPermissions);
    setHasChanges(true);
    setResetDialogOpen(false);
  };

  const handleBack = () => {
    navigate(paths.dashboard.adminUsers.root);
  };

  const getPermissionIcon = (hasPermission: boolean) =>
    hasPermission ? (
      <CheckIcon color="success" fontSize="small" />
    ) : (
      <CloseIcon color="error" fontSize="small" />
    );

  if (!currentUser) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Alert severity="error">Usuário não encontrado</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Gerenciar Permissões</Typography>
          <Typography variant="body2" color="text.secondary">
            Configure as permissões específicas do usuário
          </Typography>
        </Box>
        {hasChanges && (
          <Chip
            label="Alterações não salvas"
            color="warning"
            size="small"
            variant="outlined"
          />
        )}
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* User Info */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.name}
            sx={{ width: 60, height: 60 }}
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{currentUser.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.email}
            </Typography>
          </Box>

          <Chip
            label={ROLE_LABELS[currentUser.role]}
            color={ROLE_COLORS[currentUser.role]}
            variant="filled"
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<SecurityIcon />}
            onClick={() => setResetDialogOpen(true)}
          >
            Resetar para Padrão do Papel
          </Button>

          <Alert severity="info" icon={<InfoIcon />} sx={{ flexGrow: 1 }}>
            As permissões aqui definidas sobrescrevem as permissões padrão do
            papel do usuário.
          </Alert>
        </Stack>
      </Card>

      {/* Permissions Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Módulo/Página</TableCell>
                <TableCell align="center">Visualizar</TableCell>
                <TableCell align="center">Criar</TableCell>
                <TableCell align="center">Editar</TableCell>
                <TableCell align="center">Excluir</TableCell>
                <TableCell align="center">Exportar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">
                        {permission.page}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {permission.route}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={permission.canView}
                          onChange={(e) =>
                            handlePermissionChange(
                              permission.id,
                              "canView",
                              e.target.checked
                            )
                          }
                          size="small"
                        />
                      }
                      label=""
                    />
                  </TableCell>

                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={permission.canCreate}
                          onChange={(e) =>
                            handlePermissionChange(
                              permission.id,
                              "canCreate",
                              e.target.checked
                            )
                          }
                          size="small"
                          disabled={!permission.canView}
                        />
                      }
                      label=""
                    />
                  </TableCell>

                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={permission.canEdit}
                          onChange={(e) =>
                            handlePermissionChange(
                              permission.id,
                              "canEdit",
                              e.target.checked
                            )
                          }
                          size="small"
                          disabled={!permission.canView}
                        />
                      }
                      label=""
                    />
                  </TableCell>

                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={permission.canDelete}
                          onChange={(e) =>
                            handlePermissionChange(
                              permission.id,
                              "canDelete",
                              e.target.checked
                            )
                          }
                          size="small"
                          disabled={!permission.canView}
                        />
                      }
                      label=""
                    />
                  </TableCell>

                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={permission.canExport || false}
                          onChange={(e) =>
                            handlePermissionChange(
                              permission.id,
                              "canExport",
                              e.target.checked
                            )
                          }
                          size="small"
                          disabled={!permission.canView}
                        />
                      }
                      label=""
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Actions */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ p: 3, borderTop: 1, borderColor: "divider" }}
        >
          <Button variant="outlined" onClick={handleBack} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSavePermissions}
            disabled={loading || !hasChanges}
          >
            {loading ? "Salvando..." : "Salvar Permissões"}
          </Button>
        </Stack>
      </Card>

      {/* Reset Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Resetar Permissões</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja resetar todas as permissões para os valores
            padrão do papel <strong>{ROLE_LABELS[currentUser.role]}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Esta ação irá sobrescrever todas as permissões personalizadas
            definidas para este usuário.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleResetToRoleDefaults}
            color="warning"
            variant="contained"
          >
            Resetar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
