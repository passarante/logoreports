import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
// material
import {
  Stack,
  Button,
  Container,
  Typography,


} from '@mui/material';
// components
import Page from '../components/Page';
import ReportForm from '../components/report/ReportForm';



export default function EditReport() {
  const [state, setState] = useState({
    "title": "",
    "sqlQuery": "",
    "type": "table",
    "isLoading": false
  });

  const { id } = useParams();

  useEffect(() => {
    const report = JSON.parse(localStorage.getItem('@reports')).filter(r => r.id === id)[0];
    if (report) {
      setState({ ...report, isLoading: false })
    }
  }, [id])



  const navigate = useNavigate();

  const handleUpdateReport = () => {


    const { title, sqlQuery, type } = state;
    if (title === "" || sqlQuery === "") {
      alert("Lütfen form alanlarını doldurun.")
      return;
    }
    setState({ ...state, isLoading: true })
    setTimeout(() => {

      // TODO: Validation

      const reportsArr = JSON.parse(localStorage.getItem("@reports")) || [];
      reportsArr.map(r => {
        if (r.id === id) {
          r.title = state.title;
          r.sqlQuery = state.sqlQuery;
          r.type = state.type
        }

        return r;
      });




      localStorage.setItem("@reports", JSON.stringify(reportsArr));


      setState({ ...state, isLoading: false })
      navigate("/dashboard/reports");
    }, [2000])
    console.log(state);
  }

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rapor Düzenleme
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/reports"
            startIcon={<Icon icon={plusFill} />}
          >
            Geri Dön
          </Button>
        </Stack>

        <ReportForm state={state} setState={setState} handleAddUpdateReport={handleUpdateReport} editMode="true" />
      </Container>
    </Page>
  );
}
