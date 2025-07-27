import React, { useEffect } from 'react';
import { 
  Box, 
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as ActivateIcon,
  Pause as InactivateIcon,
} from '@mui/icons-material';

import { 
  PageHeader, 
  PageContainer, 
} from '@/components/grid';
import ResponsiveTable from '@/components/table/responsive-table';
import { useRulesStore } from '@/store/rules.store';
import { Rule, Condition } from '@/types/rules';

export default function RulesListPage() {
  const {
    rules,
    loading,
    error,
    fetchRules,
    inactivateRule,
  } = useRulesStore();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRule, setSelectedRule] = React.useState<string | null>(null);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, ruleId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRule(ruleId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRule(null);
  };

  const handleInactivate = async () => {
    if (selectedRule) {
      await inactivateRule(selectedRule);
      handleMenuClose();
    }
  };

  const tableColumns = [
    {
      id: 'name',
      label: 'Rule Name',
      minWidth: 200,
      hideOnMobile: false,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      hideOnMobile: false,
      render: (value: unknown) => (
        <Chip
          label={String(value)}
          color={value === 'active' ? 'success' : 'default'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: 'effect',
      label: 'Effect',
      minWidth: 150,
      hideOnMobile: true,
      render: (value: unknown) => {
        const effect = value as { type: string; value: number };
        return `${effect.type}: ${effect.value}`;
      },
    },
    {
      id: 'conditions',
      label: 'Conditions',
      minWidth: 100,
      hideOnMobile: true,
      render: (value: unknown) => {
        const conditions = value as Condition[];
        return `${conditions.length} condition${conditions.length !== 1 ? 's' : ''}`;
      },
    },
    {
      id: 'createdAt',
      label: 'Created',
      minWidth: 120,
      hideOnMobile: true,
      format: (value: unknown) => {
        if (!value) return '';
        return new Date(value as string).toLocaleDateString();
      },
    },
    {
      id: 'createdBy',
      label: 'Created By',
      minWidth: 120,
      hideOnMobile: true,
    },
    {
      id: 'actions',
      label: '',
      minWidth: 50,
      hideOnMobile: false,
      align: 'right' as const,
      render: (value: unknown, row: Record<string, unknown>) => (
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, String(row.id))}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  if (loading) {
    return (
      <PageContainer>
        <PageHeader
          title="Rules"
          subtitle="Loading rules..."
        />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader
          title="Rules"
          subtitle={`Error: ${error}`}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Rules"
        subtitle="Manage your point system rules and conditions"
        breadcrumbs={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Rules' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
          >
            Create Rule
          </Button>
        }
      />

      <ResponsiveTable
        columns={tableColumns}
        rows={rules}
        onRowClick={(row) => console.log('Rule clicked:', row)}
        elevation={1}
        emptyMessage="No rules found"
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 160 }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ActivateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Activate</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleInactivate}>
          <ListItemIcon>
            <InactivateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Inactivate</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </PageContainer>
  );
}
