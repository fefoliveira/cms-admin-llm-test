import { useState, useEffect } from 'react';
import { LinearProgress, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ProgressBar() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1301,
      }}
    >
      <LinearProgress />
    </Box>
  );
}