import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ConversionRate } from "../../../types/conversion-rate";

interface ConversionRateFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rate: Omit<ConversionRate, "id">) => void;
  rate?: ConversionRate | null;
  mode: "create" | "edit";
}

const initialRateState: Omit<ConversionRate, "id"> = {
  name: "",
  rate: 0,
  default: false,
  status: "active",
  startDate: new Date(),
  endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
  createdBy: "Sistema",
};

export default function ConversionRateFormDialog({
  open,
  onClose,
  onSubmit,
  rate,
  mode,
}: ConversionRateFormDialogProps) {
  const [formData, setFormData] =
    useState<Omit<ConversionRate, "id">>(initialRateState);

  useEffect(() => {
    if (rate && mode === "edit") {
      setFormData({
        name: rate.name,
        rate: rate.rate,
        default: rate.default,
        status: rate.status,
        startDate: rate.startDate,
        endDate: rate.endDate,
        createdBy: rate.createdBy,
      });
    } else {
      setFormData(initialRateState);
    }
  }, [rate, mode, open]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean | Date
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    const date = new Date(value);
    handleInputChange(field, date);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {mode === "create"
              ? "Nova Taxa de Conversão"
              : "Editar Taxa de Conversão"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
          <TextField
            label="Nome da Taxa"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Taxa de Conversão"
            type="number"
            value={formData.rate}
            onChange={(e) =>
              handleInputChange("rate", parseFloat(e.target.value) || 0)
            }
            fullWidth
            required
            inputProps={{ step: 0.001, min: 0 }}
            helperText="Ex: 0.001 = 1 ponto para cada 1000 na moeda"
          />

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              label="Data de Início"
              type="date"
              value={formatDateForInput(formData.startDate)}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Data de Fim"
              type="date"
              value={formatDateForInput(formData.endDate)}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.default}
                onChange={(e) => handleInputChange("default", e.target.checked)}
              />
            }
            label="Taxa Padrão"
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
            label="Taxa Ativa"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name.trim() || formData.rate <= 0}
        >
          {mode === "create" ? "Criar" : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
