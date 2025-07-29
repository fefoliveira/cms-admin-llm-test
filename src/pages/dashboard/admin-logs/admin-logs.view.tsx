import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  History as HistoryIcon,
  Create as CreateIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";

import { ResponsiveTable } from "@/components/table";
import { useAdminLogsStore } from "@/store/adminLogs.store";
import { AdminLog } from "@/types/admin-logs";

export default function AdminLogsView() {
  const { adminLogs, loading, error, fetchAdminLogs } = useAdminLogsStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminLogs();
  }, [fetchAdminLogs]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    logId: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedLog(logId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLog(null);
  };

  const handleViewDetails = () => {
    // TODO: Implementar visualização de detalhes
    console.log("Ver detalhes do log:", selectedLog);
    handleMenuClose();
  };

  const handleExport = () => {
    // TODO: Implementar exportação
    console.log("Exportar logs");
    handleMenuClose();
  };

  const getActionColor = (
    action: string
  ): "success" | "primary" | "error" | "warning" => {
    switch (action) {
      case "CREATE":
        return "success";
      case "UPDATE":
        return "primary";
      case "DELETE":
        return "error";
      default:
        return "warning";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "CREATE":
        return <CreateIcon fontSize="small" />;
      case "UPDATE":
        return <EditIcon fontSize="small" />;
      case "DELETE":
        return <DeleteIcon fontSize="small" />;
      default:
        return <UpdateIcon fontSize="small" />;
    }
  };

  const getEntityColor = (
    entity: string
  ): "primary" | "secondary" | "info" | "warning" => {
    switch (entity) {
      case "User":
        return "primary";
      case "Rule":
        return "secondary";
      case "Variable":
        return "info";
      case "ConversionRate":
        return "warning";
      default:
        return "primary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  const columns = [
    {
      id: "action",
      label: "Ação",
      minWidth: 120,
      render: (value: string) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {getActionIcon(value)}
          <Chip
            label={value}
            color={getActionColor(value)}
            size="small"
            variant="outlined"
          />
        </Box>
      ),
    },
    {
      id: "entity",
      label: "Entidade",
      minWidth: 120,
      render: (value: string) => (
        <Chip label={value} color={getEntityColor(value)} size="small" />
      ),
    },
    {
      id: "description",
      label: "Descrição",
      minWidth: 300,
      render: (value: string) => (
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: 300,
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: "userId",
      label: "Usuário",
      minWidth: 100,
      render: (value: string) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem" }}>
            {value}
          </Avatar>
          <Typography variant="body2">User {value}</Typography>
        </Box>
      ),
    },
    {
      id: "createdAt",
      label: "Data/Hora",
      minWidth: 150,
      render: (value: string, row: AdminLog) => (
        <Typography variant="body2" color="text.secondary">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleString("pt-BR")
            : "Não disponível"}
        </Typography>
      ),
    },
    {
      id: "actions",
      label: "Ações",
      minWidth: 80,
      align: "center" as const,
      render: (_value: unknown, row: AdminLog) => (
        <IconButton size="small" onClick={(e) => handleMenuOpen(e, row.id)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const totalActions = adminLogs.length;
  const createActions = adminLogs.filter(
    (log) => log.action === "CREATE"
  ).length;
  const updateActions = adminLogs.filter(
    (log) => log.action === "UPDATE"
  ).length;
  const deleteActions = adminLogs.filter(
    (log) => log.action === "DELETE"
  ).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Logs de Administração
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Histórico completo de ações realizadas pelos administradores
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Exportar Logs
        </Button>
      </Box>

      {/* Stats Cards */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <HistoryIcon color="primary" />
              <Typography variant="h4" color="primary.main" fontWeight={600}>
                {totalActions}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Total de Ações
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <CreateIcon color="success" />
              <Typography variant="h4" color="success.main" fontWeight={600}>
                {createActions}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Criações
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <EditIcon color="primary" />
              <Typography variant="h4" color="primary.main" fontWeight={600}>
                {updateActions}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Atualizações
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <DeleteIcon color="error" />
              <Typography variant="h4" color="error.main" fontWeight={600}>
                {deleteActions}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Exclusões
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Table */}
      <Card>
        <ResponsiveTable
          columns={columns}
          rows={adminLogs}
          emptyMessage="Nenhum log encontrado"
        />
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver Detalhes</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
