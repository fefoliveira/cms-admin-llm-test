import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  Stack,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Alert,
  Divider,
  Paper,
  InputAdornment,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

import { useAdminUsersStore } from "../../../store/adminUsers.store";
import { AdminUserFormData } from "../../../types/admin-user";
import { paths } from "../../../routes/paths";

const ROLE_OPTIONS = [
  {
    value: "super_admin",
    label: "Super Administrador",
    description: "Acesso total ao sistema",
  },
  {
    value: "admin",
    label: "Administrador",
    description: "Acesso amplo, exceto gerenciamento de admins",
  },
  {
    value: "moderator",
    label: "Moderador",
    description: "Acesso de edição limitado",
  },
  {
    value: "viewer",
    label: "Visualizador",
    description: "Apenas visualização",
  },
];

export default function AdminUserFormView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    adminUsers,
    createAdminUser,
    updateAdminUser,
    generatePermissionsForRole,
    fetchAdminUsers,
  } = useAdminUsersStore();

  const currentUser = isEditing ? adminUsers.find((u) => u.id === id) : null;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdminUserFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "viewer",
      isActive: true,
      permissions: [],
    },
  });

  const watchedRole = watch("role");

  useEffect(() => {
    if (isEditing && !currentUser) {
      fetchAdminUsers();
    }
  }, [isEditing, currentUser, fetchAdminUsers]);

  useEffect(() => {
    if (currentUser && isEditing) {
      setValue("name", currentUser.name);
      setValue("email", currentUser.email);
      setValue("role", currentUser.role);
      setValue("isActive", currentUser.isActive);
      setValue("permissions", currentUser.permissions);

      if (currentUser.avatar) {
        setPreviewAvatar(currentUser.avatar);
      }
    }
  }, [currentUser, isEditing, setValue]);

  useEffect(() => {
    // Auto-generate permissions when role changes
    if (watchedRole) {
      const permissions = generatePermissionsForRole(watchedRole);
      setValue("permissions", permissions);
    }
  }, [watchedRole, generatePermissionsForRole, setValue]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setValue("avatar", file);
    }
  };

  const onSubmit = async (data: AdminUserFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Basic validation
      if (!data.name || !data.email) {
        throw new Error("Nome e email são obrigatórios");
      }

      if (!isEditing && !data.password) {
        throw new Error("Senha é obrigatória para novos usuários");
      }

      if (data.password && data.password !== data.confirmPassword) {
        throw new Error("Senhas não coincidem");
      }

      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        isActive: data.isActive,
        permissions: data.permissions,
        ...(data.password && { password: data.password }),
        ...(data.avatar &&
          typeof data.avatar === "string" && { avatar: data.avatar }),
      };

      if (isEditing && currentUser) {
        await updateAdminUser(currentUser.id, userData);
      } else {
        await createAdminUser({
          ...userData,
          password: data.password!,
        });
      }

      navigate(paths.dashboard.adminUsers.root);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(paths.dashboard.adminUsers.root);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4">
            {isEditing ? "Editar Administrador" : "Novo Administrador"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isEditing
              ? "Edite as informações do administrador"
              : "Crie um novo usuário administrador"}
          </Typography>
        </Box>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Profile Photo */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Foto do Perfil
            </Typography>

            <Stack alignItems="center" spacing={2}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={previewAvatar || undefined}
                  sx={{ width: 120, height: 120 }}
                >
                  {!previewAvatar && <PersonIcon sx={{ fontSize: 60 }} />}
                </Avatar>
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <PhotoCameraIcon />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="center"
              >
                Clique no ícone da câmera para alterar a foto
              </Typography>
            </Stack>
          </Card>

          {/* Form Fields */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Informações Básicas
            </Typography>

            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nome Completo"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    ...(isEditing ? {} : { required: "Senha é obrigatória" }),
                    minLength: {
                      value: 8,
                      message: "Senha deve ter pelo menos 8 caracteres",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={isEditing ? "Nova Senha (opcional)" : "Senha"}
                      type={showPassword ? "text" : "password"}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    validate: (value) => {
                      const password = watch("password");
                      if (password && !value) {
                        return "Confirmação de senha é obrigatória";
                      }
                      if (password && value !== password) {
                        return "Senhas não coincidem";
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirmar Senha"
                      type={showConfirmPassword ? "text" : "password"}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Papel é obrigatório" }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.role}>
                      <InputLabel>Papel</InputLabel>
                      <Select {...field} label="Papel">
                        {ROLE_OPTIONS.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Box>
                              <Typography variant="subtitle2">
                                {option.label}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {option.description}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.role && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5 }}
                        >
                          {errors.role.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                <Box
                  sx={{ display: "flex", alignItems: "center", minWidth: 200 }}
                >
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value}
                            onChange={field.onChange}
                            color="primary"
                          />
                        }
                        label="Usuário Ativo"
                      />
                    )}
                  />
                </Box>
              </Stack>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Role Description */}
            {watchedRole && (
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="subtitle2" gutterBottom>
                  Permissões do Papel Selecionado:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {
                    ROLE_OPTIONS.find((r) => r.value === watchedRole)
                      ?.description
                  }
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  As permissões serão aplicadas automaticamente com base no
                  papel selecionado. Você pode gerenciar permissões específicas
                  após salvar o usuário.
                </Typography>
              </Paper>
            )}

            {/* Actions */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isSubmitting || loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isSubmitting || loading}
              >
                {loading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
              </Button>
            </Stack>
          </Card>
        </Stack>
      </form>
    </Box>
  );
}
