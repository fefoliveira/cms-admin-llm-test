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
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import { ResponsiveTable } from "@/components/table";
import { useVariablesStore } from "@/store/variables.store";
import { Variable } from "@/types/variables";

export default function VariablesView() {
  const { variables, loading, error, fetchVariables } = useVariablesStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);

  useEffect(() => {
    fetchVariables();
  }, [fetchVariables]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    variableId: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedVariable(variableId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVariable(null);
  };

  const handleEdit = () => {
    // TODO: Implementar edição
    console.log("Editar variável:", selectedVariable);
    handleMenuClose();
  };

  const handleDelete = () => {
    // TODO: Implementar exclusão
    console.log("Excluir variável:", selectedVariable);
    handleMenuClose();
  };

  const getValueTypeColor = (
    valueType: string
  ): "primary" | "success" | "warning" | "default" => {
    switch (valueType) {
      case "string":
        return "primary";
      case "number":
        return "success";
      case "boolean":
        return "warning";
      default:
        return "default";
    }
  };

  const getInputTypeIcon = (inputType: string) => {
    switch (inputType) {
      case "select":
        return "📋";
      case "number":
        return "🔢";
      case "text":
        return "📝";
      case "radio":
        return "🔘";
      case "checkbox":
        return "☑️";
      default:
        return "⚙️";
    }
  };

  const columns = [
    {
      id: "name",
      label: "Nome da Variável",
      minWidth: 200,
      render: (value: string, row: Variable) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CodeIcon color="primary" fontSize="small" />
          <Typography variant="body2" fontWeight={500}>
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      id: "valueType",
      label: "Tipo de Valor",
      minWidth: 120,
      render: (value: string) => (
        <Chip
          label={value}
          color={getValueTypeColor(value)}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: "inputType",
      label: "Tipo de Input",
      minWidth: 150,
      render: (value: string) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontSize="1.2rem">{getInputTypeIcon(value)}</Typography>
          <Typography variant="body2" textTransform="capitalize">
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      id: "createdBy",
      label: "Criado por",
      minWidth: 120,
      render: (value: string) => (
        <Chip
          label={value}
          color={value === "admin" ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      id: "actions",
      label: "Ações",
      minWidth: 80,
      align: "center" as const,
      render: (_value: unknown, row: Variable) => (
        <IconButton size="small" onClick={(e) => handleMenuOpen(e, row.id)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

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
            Variáveis do Sistema
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie as variáveis utilizadas nas regras de pontuação
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => console.log("Criar nova variável")}
        >
          Nova Variável
        </Button>
      </Box>

      {/* Stats Cards */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="primary.main" fontWeight={600}>
              {variables.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Variáveis
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="success.main" fontWeight={600}>
              {variables.filter((v) => v.valueType === "number").length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Variáveis Numéricas
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="warning.main" fontWeight={600}>
              {variables.filter((v) => v.valueType === "string").length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Variáveis de Texto
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="info.main" fontWeight={600}>
              {variables.filter((v) => v.createdBy === "admin").length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Criadas por Admin
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Table */}
      <Card>
        <ResponsiveTable
          columns={columns}
          rows={variables}
          emptyMessage="Nenhuma variável encontrada"
        />
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
