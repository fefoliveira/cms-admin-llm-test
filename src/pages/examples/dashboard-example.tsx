import React from 'react';
import { 
  Box, 
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import { 
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

import { 
  PageHeader, 
  PageContainer, 
  DashboardCard 
} from '@/components/grid';
import ResponsiveTable from '@/components/table/responsive-table';

// Mock data for demonstration
const mockStats = [
  {
    title: 'Total Users',
    value: '2,543',
    icon: <PeopleIcon />,
    color: 'primary' as const,
    trend: { value: 12.5, label: 'vs last month', isUpward: true },
  },
  {
    title: 'Active Rules',
    value: '156',
    icon: <SettingsIcon />,
    color: 'success' as const,
    trend: { value: 8.2, label: 'vs last month', isUpward: true },
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    icon: <TrendingUpIcon />,
    color: 'warning' as const,
    trend: { value: -2.1, label: 'vs last month', isUpward: false },
  },
  {
    title: 'Reports Generated',
    value: '890',
    icon: <AssessmentIcon />,
    color: 'info' as const,
    trend: { value: 15.3, label: 'vs last month', isUpward: true },
  },
];

const mockTableData = [
  {
    id: '1',
    name: 'Summer Promotion',
    status: 'active',
    type: 'add',
    value: '50',
    createdAt: '2025-01-15',
    createdBy: 'admin',
  },
  {
    id: '2', 
    name: 'Premium Member Bonus',
    status: 'inactive',
    type: 'multiply',
    value: '2',
    createdAt: '2025-01-10',
    createdBy: 'user',
  },
  {
    id: '3',
    name: 'Holiday Special',
    status: 'active',
    type: 'add',
    value: '25',
    createdAt: '2025-01-05',
    createdBy: 'admin',
  },
];

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
    id: 'type',
    label: 'Type',
    minWidth: 100,
    hideOnMobile: true,
    format: (value: unknown) => String(value).toUpperCase(),
  },
  {
    id: 'value',
    label: 'Value',
    minWidth: 80,
    hideOnMobile: true,
    align: 'right' as const,
  },
  {
    id: 'createdAt',
    label: 'Created',
    minWidth: 120,
    hideOnMobile: true,
    format: (value: unknown) => new Date(String(value)).toLocaleDateString(),
  },
  {
    id: 'createdBy',
    label: 'Created By',
    minWidth: 120,
    hideOnMobile: true,
  },
];

export default function DashboardExamplePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor key metrics and manage your point system"
        breadcrumbs={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Overview' },
        ]}
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              size="large"
            >
              New Rule
            </Button>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
        }
      />

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        {mockStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </Box>

      {/* Recent Rules Table */}
      <Box>
        <PageHeader
          title="Recent Rules"
          subtitle="Latest rules and their status"
          action={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="medium"
            >
              Add Rule
            </Button>
          }
        />
        
        <ResponsiveTable
          columns={tableColumns}
          rows={mockTableData}
          onRowClick={(row) => console.log('Row clicked:', row)}
          elevation={1}
        />
      </Box>
    </PageContainer>
  );
}
