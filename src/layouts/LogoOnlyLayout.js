import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
// components

import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@token');
    if (token) {
      // TODO: Validate token
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </HeaderStyle>
      <Outlet />
    </>
  );
}
