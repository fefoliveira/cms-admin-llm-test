import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Chip,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Rule, Condition, Effect } from "../../../types/rules";

interface RuleFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rule: Omit<Rule, "id" | "createdAt">) => void;
  rule?: Rule | null;
  mode: "create" | "edit";
}

const initialRuleState: Omit<Rule, "id" | "createdAt"> = {
  name: "",
  effect: {
    type: "add",
    value: 0,
  },
  conditions: [],
  status: "active",
  createdBy: "Sistema",
};

export default function RuleFormDialog({
  open,
  onClose,
  onSubmit,
  rule,
  mode,
}: RuleFormDialogProps) {
  const [formData, setFormData] =
    useState<Omit<Rule, "id" | "createdAt">>(initialRuleState);

  useEffect(() => {
    if (rule && mode === "edit") {
      setFormData({
        name: rule.name,
        conditions: rule.conditions,
        effect: rule.effect,
        status: rule.status,
        createdBy: rule.createdBy,
      });
    } else {
      setFormData(initialRuleState);
    }
  }, [rule, mode, open]);

  const handleInputChange = (
    field: string,
    value: string | "active" | "inactive"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEffectChange = (
    field: "type" | "value",
    value: "add" | "multiply" | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      effect: {
        ...prev.effect,
        [field]:
          field === "value"
            ? typeof value === "number"
              ? value
              : parseFloat(value as string) || 0
            : value,
      },
    }));
  };

  const addCondition = () => {
    const newCondition: Condition = {
      field: "amount",
      operation: "greater",
      value: ["0"],
      valueType: "number",
      inputType: "basic",
      valueFile: "",
    };
    setFormData((prev) => ({
      ...prev,
      conditions: [...prev.conditions, newCondition],
    }));
  };

  const updateCondition = (
    index: number,
    field: keyof Condition,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) =>
        i === index
          ? {
              ...condition,
              [field]:
                field === "value"
                  ? Array.isArray(value)
                    ? value
                    : [value]
                  : value,
            }
          : condition
      ),
    }));
  };

  const removeCondition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {mode === "create" ? "Nova Regra" : "Editar Regra"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
          <TextField
            label="Nome da Regra"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
            required
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.status === "active"}
                onChange={(e) =>
                  handleInputChange(
                    "status",
                    e.target.checked ? "active" : "inactive"
                  )
                }
              />
            }
            label="Regra Ativa"
          />

          {/* Condições */}
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Condições</Typography>
              <Button startIcon={<AddIcon />} onClick={addCondition}>
                Adicionar Condição
              </Button>
            </Box>

            {formData.conditions.map((condition, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
              >
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Campo</InputLabel>
                  <Select
                    value={condition.field}
                    onChange={(e) =>
                      updateCondition(index, "field", e.target.value)
                    }
                  >
                    <MenuItem value="amount">Valor</MenuItem>
                    <MenuItem value="date">Data</MenuItem>
                    <MenuItem value="user_type">Tipo de Usuário</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 140 }}>
                  <InputLabel>Operador</InputLabel>
                  <Select
                    value={condition.operation}
                    onChange={(e) =>
                      updateCondition(index, "operation", e.target.value)
                    }
                  >
                    <MenuItem value="greater">Maior que</MenuItem>
                    <MenuItem value="less">Menor que</MenuItem>
                    <MenuItem value="equal">Igual a</MenuItem>
                    <MenuItem value="exist">Existe</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Valor"
                  value={condition.value[0] || ""}
                  onChange={(e) =>
                    updateCondition(index, "value", [e.target.value])
                  }
                  sx={{ flexGrow: 1 }}
                />

                <IconButton
                  onClick={() => removeCondition(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Efeito */}
          <Box>
            <Typography variant="h6" mb={2}>
              Efeito da Regra
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Tipo de Efeito</InputLabel>
                <Select
                  value={formData.effect.type}
                  onChange={(e) =>
                    handleEffectChange(
                      "type",
                      e.target.value as "add" | "multiply"
                    )
                  }
                >
                  <MenuItem value="add">Adicionar</MenuItem>
                  <MenuItem value="multiply">Multiplicar</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Valor"
                type="number"
                value={formData.effect.value}
                onChange={(e) =>
                  handleEffectChange("value", parseFloat(e.target.value) || 0)
                }
                sx={{ flexGrow: 1 }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name.trim()}
        >
          {mode === "create" ? "Criar" : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
