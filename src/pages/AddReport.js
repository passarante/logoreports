import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { v4 as uuid } from "uuid";
// material
import {
  Stack,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert

} from '@mui/material';
// components
import axios from 'axios';
import { API_URL } from '../constants';
import Page from '../components/Page';
import ReportForm from '../components/report/ReportForm';





export default function AddReport() {
  const [state, setState] = useState({
    "title": "",
    "sqlQuery": "",
    "type": "table",
    "isLoading": false,
    "errorMessage": ""
  });

  const [isFocus, setIsFocus] = useState(false);
  const [showSnack, setShowSnack] = useState(false);

  const navigate = useNavigate();

  const handleAddReport = async () => {

    const { title, sqlQuery, type } = state;
    if (title === "" || sqlQuery === "") {

      setState({ ...state, isLoading: false, errorMessage: "Lütfen form alanlarını doldurun." })
      openSnack()
      return;
    }
    setState({ ...state, isLoading: true })
    setIsFocus(false);
    setTimeout(async () => {



      await axios.get(`${API_URL}${sqlQuery}`).then(res => {
        if (res.data.Success) {
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
          navigate("/dashboard/reports");
        } else {

          setIsFocus(true);
          setState({ ...state, isLoading: false, errorMessage: res.data.Message })
          openSnack()
        }
      })


    }, [2000])
    console.log(state);
  }

  const closeSnack = () => {
    setShowSnack(false);
  }
  const openSnack = () => {
    setShowSnack(true);
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
            to="/dashboard/reports"
            startIcon={<Icon icon={plusFill} />}
          >
            Geri Dön
          </Button>
        </Stack>
        <ReportForm isFocus={isFocus} state={state} setState={setState} handleAddUpdateReport={handleAddReport} />
      </Container>

      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={showSnack} autoHideDuration={3000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity="error" sx={{ width: '100%' }}>
          {state.errorMessage}
        </Alert>
      </Snackbar>
    </Page>
  );
}
