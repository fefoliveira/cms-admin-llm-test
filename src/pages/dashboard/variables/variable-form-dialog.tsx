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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Variable } from "../../../types/variables";

interface VariableFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (variable: Omit<Variable, "id" | "createdAt">) => void;
  variable?: Variable | null;
  mode: "create" | "edit";
}

const initialVariableState: Omit<Variable, "id" | "createdAt"> = {
  name: "",
  valueType: "string",
  inputType: "basic",
  createdBy: "Sistema",
};

export default function VariableFormDialog({
  open,
  onClose,
  onSubmit,
  variable,
  mode,
}: VariableFormDialogProps) {
  const [formData, setFormData] =
    useState<Omit<Variable, "id" | "createdAt">>(initialVariableState);

  useEffect(() => {
    if (variable && mode === "edit") {
      setFormData({
        name: variable.name,
        valueType: variable.valueType,
        inputType: variable.inputType,
        createdBy: variable.createdBy,
      });
    } else {
      setFormData(initialVariableState);
    }
  }, [variable, mode, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {mode === "create" ? "Nova Variável" : "Editar Variável"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
          <TextField
            label="Nome da Variável"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
            required
            helperText="Nome único para identificar a variável"
          />

          <FormControl fullWidth>
            <InputLabel>Tipo de Valor</InputLabel>
            <Select
              value={formData.valueType}
              onChange={(e) => handleInputChange("valueType", e.target.value)}
              label="Tipo de Valor"
            >
              <MenuItem value="string">Texto</MenuItem>
              <MenuItem value="number">Número</MenuItem>
              <MenuItem value="date">Data</MenuItem>
              <MenuItem value="datetime">Data e Hora</MenuItem>
              <MenuItem value="boolean">Verdadeiro/Falso</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tipo de Entrada</InputLabel>
            <Select
              value={formData.inputType}
              onChange={(e) => handleInputChange("inputType", e.target.value)}
              label="Tipo de Entrada"
            >
              <MenuItem value="basic">Campo Básico</MenuItem>
              <MenuItem value="list">Lista de Opções</MenuItem>
              <MenuItem value="range">Faixa de Valores</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Criado por"
            value={formData.createdBy}
            onChange={(e) => handleInputChange("createdBy", e.target.value)}
            fullWidth
          />
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
