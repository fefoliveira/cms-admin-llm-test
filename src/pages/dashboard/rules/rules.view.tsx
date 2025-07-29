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
import { useRules } from "./rules.hook";

// ----------------------------------------------------------------------

export default function RulesView() {
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
  } = useRules();

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
          onClick={() => {
            // Handle create rule
            console.log("Create rule");
          }}
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
                      <IconButton onClick={() => console.log("Edit", rule.id)}>
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
    </Box>
  );
}
