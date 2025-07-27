# Sistema de Responsividade - Point Forge Admin

## 🎯 **Visão Geral**

O sistema de responsividade foi completamente reestruturado para oferecer uma experiência otimizada em todos os dispositivos.

## 📱 **Breakpoints**

```typescript
xs: 0px      // Mobile
sm: 600px    // Tablet
md: 900px    // Desktop pequeno
lg: 1200px   // Desktop
xl: 1536px   // Desktop grande
```

## 🔧 **Hooks Disponíveis**

### useIsMobile()

```typescript
import { useIsMobile } from "@/hooks/use-mobile";

const isMobile = useIsMobile(); // true se < 900px
```

### useResponsive()

```typescript
import { useResponsive } from "@/hooks/use-mobile";

const isTablet = useResponsive("between", "sm", "md");
const isDesktop = useResponsive("up", "lg");
```

### Hooks Específicos

```typescript
import {
  useIsTablet,
  useIsDesktop,
  useIsSmallScreen,
} from "@/hooks/use-mobile";
```

## 🧩 **Componentes Responsivos**

### ResponsiveTable

```typescript
import { ResponsiveTable } from "@/components/table";

<ResponsiveTable
  columns={[
    { id: "name", label: "Nome" },
    { id: "email", label: "Email", hideOnMobile: true },
  ]}
  rows={data}
  onRowClick={(row) => console.log(row)}
/>;
```

### ResponsiveGrid

```typescript
import { ResponsiveGrid, ResponsiveCardGrid } from "@/components/grid";

<ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</ResponsiveGrid>;
```

## 🎨 **Estilos Utilitários**

### Usando no sx prop

```typescript
import { responsiveStyles } from '@/theme/css';

<Box sx={responsiveStyles.showMobile}>
  Visível apenas no mobile
</Box>

<Typography sx={responsiveStyles.responsiveText}>
  Texto que ajusta o tamanho
</Typography>
```

## 📋 **Layout Dashboard**

O layout principal já está otimizado com:

- ✅ **Drawer responsivo** (240px mobile, 280px desktop)
- ✅ **AppBar adaptativo** (diferentes heights)
- ✅ **Container fluido** com max-width
- ✅ **Spacing responsivo** em todas as telas
- ✅ **Navegação mobile** com overlay

## 🎯 **Melhores Práticas**

### 1. **Use os hooks personalizados**

```typescript
// ❌ Evite
const isMobile = useMediaQuery("(max-width: 900px)");

// ✅ Prefira
const isMobile = useIsMobile();
```

### 2. **Aproveite o sistema de breakpoints**

```typescript
// ✅ Use breakpoints do tema
sx={{
  padding: { xs: 1, sm: 2, md: 3 },
  fontSize: { xs: '0.875rem', md: '1rem' },
}}
```

### 3. **Components responsivos**

```typescript
// ✅ Use componentes específicos
<ResponsiveTable columns={columns} rows={data} />

// Em vez de implementar lógica manual
```

### 4. **Grid CSS moderno**

```typescript
// ✅ Use grid CSS para layouts
<Box sx={{
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  gap: 2,
}}>
```

## 📱 **Exemplo Completo**

```typescript
import { Box, Card, Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/use-mobile";
import { ResponsiveGrid } from "@/components/grid";
import { ResponsiveTable } from "@/components/table";

export default function ResponsivePage() {
  const isMobile = useIsMobile();

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        Página Responsiva
      </Typography>

      {/* Grid de Cards */}
      <ResponsiveGrid columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
        {cards.map((card) => (
          <Card key={card.id} sx={{ p: 2 }}>
            {card.content}
          </Card>
        ))}
      </ResponsiveGrid>

      {/* Tabela Responsiva */}
      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <ResponsiveTable
          columns={columns}
          rows={rows}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
}
```

## 🚀 **Recursos Implementados**

✅ **Breakpoints customizados**
✅ **Hooks de responsividade**  
✅ **Layout dashboard responsivo**
✅ **Tabela responsiva (cards no mobile)**
✅ **Grid system moderno**
✅ **Utility styles**
✅ **Theme integration**
✅ **TypeScript completo**

O sistema agora oferece uma experiência consistente e otimizada em todos os dispositivos! 🎉
