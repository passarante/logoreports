import React, { useEffect, useRef } from 'react';
import { Card, FormControl, InputLabel, Select, Stack, TextareaAutosize, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const ReportForm = ({ state, setState, handleAddUpdateReport, isFocus, editMode = false }) => {
  const sqlQueryRef = useRef();

  useEffect(() => {
    sqlQueryRef.current.focus();
  }, [isFocus])

  return (
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
          ref={sqlQueryRef}
          value={state.sqlQuery}
          onChange={e => setState({ ...state, sqlQuery: e.target.value })}
        />

      </Stack>

      <FormControl fullWidth style={{ marginTop: 40 }}>
        <span style={{ marginLeft: 10, marginBottom: 10 }}>Rapor Tipi</span>
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
        onClick={handleAddUpdateReport}

      >
        {editMode ? "Güncelle" : "Kaydet"}
      </LoadingButton>
    </Card>
  )
}

export default ReportForm;
