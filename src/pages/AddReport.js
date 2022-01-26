import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { v4 as uuid } from "uuid";
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import Page from '../components/Page';



export default function AddReport() {
  const [state, setState] = useState({
    "title": "",
    "sqlQuery": "",
    "type": "table",
    "isLoading": false
  })

  const handleAddReport = () => {
    setState({ ...state, isLoading: true })
    setTimeout(() => {

      // TODO: Validation
      const { title, sqlQuery, type } = state;
      const reportsArr = JSON.parse(localStorage.getItem("@reports")) || [];

      const newReport = {
        id: uuid(),
        title,
        sqlQuery,
        type
      }

      reportsArr.push(newReport);

      localStorage.setItem("@reports", JSON.stringify(reportsArr));


      setState({ ...state, isLoading: false })
    }, [2000])
    console.log(state);
  }

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rapor Ekleme
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Geri Dön
          </Button>
        </Stack>

        <Card style={{ padding: 20 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              type="text"
              label="Rapor Adı"
              value={state.title}
              onChange={e => setState({ ...state, title: e.target.value })}

            />
          </Stack>
          <Stack spacing={3} style={{ marginTop: 30 }}>

            <TextareaAutosize
              aria-label="minimum height"
              minRows={8}
              placeholder="Sql Sorgunuz"
              style={{ width: "100%", padding: 20 }}
              label="Sql Sorgunuz"
              value={state.sqlQuery}
              onChange={e => setState({ ...state, sqlQuery: e.target.value })}
            />

          </Stack>

          <FormControl fullWidth style={{ marginTop: 40 }}>
            <InputLabel id="demo-simple-select-label">Rapor Tipi</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.type}
              label="Age"
              onChange={e => setState({ ...state, type: e.target.value })}
            >
              <MenuItem value="table">Tablo</MenuItem>
              <MenuItem value="chart">Grafik</MenuItem>

            </Select>
          </FormControl>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            style={{ marginTop: 20 }}
            loading={state.isLoading}
            onClick={handleAddReport}

          >
            Kaydet
          </LoadingButton>


        </Card>
      </Container>
    </Page>
  );
}
