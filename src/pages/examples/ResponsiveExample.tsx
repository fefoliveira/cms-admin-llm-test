import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreIcon 
} from '@mui/icons-material';

import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { ResponsiveTable } from '@/components/table';
import { ResponsiveGrid } from '@/components/grid';
import { responsiveStyles } from '@/theme/css';

// ----------------------------------------------------------------------

// Mock data types
interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface StatCard {
  id: number;
  title: string;
  value: string;
  growth: string;
  color: 'primary' | 'success' | 'warning' | 'info';
}

// Mock data
const mockData: User[] = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Admin', status: 'Ativo' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'User', status: 'Inativo' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Editor', status: 'Ativo' },
];

const mockCards: StatCard[] = [
  { id: 1, title: 'Total Usuários', value: '1,234', growth: '+12%', color: 'primary' },
  { id: 2, title: 'Vendas', value: 'R$ 45,678', growth: '+8%', color: 'success' },
  { id: 3, title: 'Pedidos', value: '567', growth: '-3%', color: 'warning' },
  { id: 4, title: 'Conversão', value: '12.5%', growth: '+15%', color: 'info' },
];

// ----------------------------------------------------------------------

export default function ResponsiveExample() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedRow, setSelectedRow] = useState<User | null>(null);

  // Table columns configuration
  const columns = [
    { id: 'name', label: 'Nome', minWidth: 120 },
    { id: 'email', label: 'Email', minWidth: 150, hideOnMobile: true },
    { id: 'role', label: 'Papel', minWidth: 100 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 80,
      format: (value: string) => value,
    },
    {
      id: 'actions',
      label: 'Ações',
      minWidth: 120,
      hideOnMobile: true,
      format: () => 'Ações'
    }
  ];

  const handleRowClick = (row: Record<string, unknown>) => {
    setSelectedRow(row as User);
    console.log('Row clicked:', row);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ 
        mb: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
      }}>
        <Typography 
          variant={isMobile ? 'h5' : 'h4'}
          sx={{ fontWeight: 600 }}
        >
          Dashboard Responsivo
        </Typography>
        
        <Button 
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
          sx={{ 
            minWidth: { xs: '100%', sm: 'auto' },
            height: { xs: 44, sm: 'auto' }
          }}
        >
          Novo Item
        </Button>
      </Box>

      {/* Stats Cards Grid */}
      <ResponsiveGrid
        columns={{ xs: 1, sm: 2, lg: 4 }}
        spacing={2}
      >
        {mockCards.map((card) => (
          <Card 
            key={card.id}
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Stack spacing={1}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {card.title}
                </Typography>
                
                <Typography 
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{ fontWeight: 700 }}
                >
                  {card.value}
                </Typography>
                
                <Chip
                  label={card.growth}
                  color={card.color}
                  size={isMobile ? 'small' : 'medium'}
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>

      {/* Responsive Info */}
      <Card sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Informações de Responsividade
        </Typography>
        
        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>Dispositivo atual:</strong> {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </Typography>
          
          <Typography variant="body2">
            <strong>Largura da tela:</strong> {window.innerWidth}px
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
            <Chip 
              label="Mobile" 
              color={isMobile ? 'primary' : 'default'}
              size="small"
            />
            <Chip 
              label="Tablet" 
              color={isTablet ? 'primary' : 'default'}
              size="small"
            />
            <Chip 
              label="Desktop" 
              color={!isMobile && !isTablet ? 'primary' : 'default'}
              size="small"
            />
          </Box>
        </Stack>
      </Card>

      {/* Data Table */}
      <Card sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, sm: 3 }, pb: 0 }}>
          <Typography variant="h6" gutterBottom>
            Tabela Responsiva
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            No mobile, a tabela vira cards. No desktop, mantém formato de tabela.
          </Typography>
        </Box>
        
        <Box sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
          <ResponsiveTable
            columns={columns}
            rows={mockData}
            onRowClick={handleRowClick}
            emptyMessage="Nenhum usuário encontrado"
          />
        </Box>
      </Card>

      {/* Selected Row Info */}
      {selectedRow && (
        <Card sx={{ mt: { xs: 3, md: 4 }, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" gutterBottom>
            Item Selecionado
          </Typography>
          <Typography variant="body2">
            {JSON.stringify(selectedRow, null, 2)}
          </Typography>
        </Card>
      )}

      {/* Utility Classes Demo */}
      <Card sx={{ mt: { xs: 3, md: 4 }, p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Demonstração de Classes Utilitárias
        </Typography>
        
        <Stack spacing={2}>
          <Box sx={responsiveStyles.showMobile}>
            <Chip label="Visível apenas no Mobile" color="warning" />
          </Box>
          
          <Box sx={responsiveStyles.hideTablet}>
            <Chip label="Oculto no Tablet" color="info" />
          </Box>
          
          <Box sx={responsiveStyles.showDesktop}>
            <Chip label="Visível apenas no Desktop" color="success" />
          </Box>
          
          <Typography sx={responsiveStyles.responsiveText}>
            Este texto tem tamanho responsivo baseado na tela
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
