import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Chip,
  IconButton,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useState } from "react";
import { useRules } from "./rules.hook";
import { Rule } from "../../../types/rules";
import RuleFormDialog from "./rule-form-dialog";

// ----------------------------------------------------------------------

export default function RulesView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const {
    rules,
    loading,
    error,
    order,
    orderBy,
    page,
    rowsPerPage,
    dense,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
    inactivateRule,
    createRule,
    updateRule,
  } = useRules();

  const handleCreateRule = () => {
    setSelectedRule(null);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const handleEditRule = (rule: Rule) => {
    setSelectedRule(rule);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleSubmitRule = (ruleData: Omit<Rule, "id" | "createdAt">) => {
    if (dialogMode === "create") {
      createRule(ruleData);
    } else if (selectedRule) {
      updateRule(selectedRule.id, {
        name: ruleData.name,
        effect: {
          type: ruleData.effect.type,
          value: ruleData.effect.value.toString(),
        },
        conditions: ruleData.conditions,
        status: ruleData.status,
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Erro: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Regras</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateRule}
        >
          Nova Regra
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Nome
                  </TableSortLabel>
                </TableCell>
                <TableCell>Efeito</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Criado por</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.name}</TableCell>
                    <TableCell>
                      {rule.effect.type === "add" ? "Adicionar" : "Multiplicar"}{" "}
                      {rule.effect.value}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={rule.status === "active" ? "Ativo" : "Inativo"}
                        color={rule.status === "active" ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{rule.createdBy}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditRule(rule)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => inactivateRule(rule.id)}
                        disabled={rule.status === "inactive"}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Densidade compacta"
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rules.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>

      <RuleFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmitRule}
        rule={selectedRule}
        mode={dialogMode}
      />
    </Box>
  );
}
