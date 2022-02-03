/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableCell, TableRow, TableBody, Table, TableContainer, TablePagination, TextField } from '@mui/material';
import { API_URL } from '../../constants/index';

import Scrollbar from "../Scrollbar";
import ReportTableHeader from './ReportTableHeader';
import SearchNotFound from '../SearchNotFound';



const ReportComponent = ({ report }) => {

  const [reportDetail, setReportDetail] = useState(null);
  const [filteredReports, setFilteredReports] = useState(reportDetail);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isReportNotFound, setIsReportNotFound] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (report) {

      axios.get(API_URL + report.sqlQuery).then(res => {
        setReportDetail(res.data);
        setFilteredReports(res.data);
        if (res.data.length > 0) {
          setTableHeaders(Object.keys(res.data[0]))
        }
      })
    }
    return () => { }
  }, [report])

  const handleChangeRowsPerPage = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  }
  const handleChangePage = (e, newPage) => {
    setCurrentPage(newPage);
  };

  const getReportLine = (row, header) => row[header]

  const handleSearchReport = (e) => {

    if (e.target.value !== "") {

      setSearchTerm(e.target.value)

      const tempArr = [];

      reportDetail.map(row => {
        if (isInArray(row, e.target.value)) {
          tempArr.push(row);
        }
      })

      if (!tempArr || tempArr.length === 0) {

        setIsReportNotFound(true)
      } else {
        setIsReportNotFound(false);
      }
      setFilteredReports(tempArr);
    }
  }


  const isInArray = (r, term) => {

    let status = false;
    tableHeaders.forEach(h => {
      const value = getReportLine(r, h);
      if (value.toLowerCase().includes(term.trim().toLowerCase())) {
        status = true;

        console.log(value);
      }
    })
    return status;
  }


  return (
    <div>

      {/* {tableHeaders && reportDetail && reportDetail.length > 0 && (
        <table>
          <thead>
            <tr>
              {tableHeaders.map(th => <th key={th}>{th}</th>)}
            </tr>
          </thead>
          <tbody>
            {reportDetail.map((r, index) => (
              <tr key={index}>
                {tableHeaders.map((t, idx) => <td key={idx}>{getReportLine(r, t)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )} */}


      {filteredReports && (
        <>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <TextField onChange={e => handleSearchReport(e)} placeholder='Arama...' fullWidth style={{ marginBottom: 20 }} />
              <Table>
                <ReportTableHeader headers={tableHeaders} />
                <TableBody>
                  {filteredReports.length > 0 && filteredReports.slice(currentPage * perPage, currentPage * perPage + perPage).map((r, rIndex) => (
                    <TableRow key={rIndex}>
                      {tableHeaders.map((t, tIndex) => <TableCell key={tIndex} align="center">
                        {getReportLine(r, t)}
                      </TableCell>)}

                    </TableRow>
                  ))}

                </TableBody>
                {isReportNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={searchTerm} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReports.length}
            rowsPerPage={perPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />


        </>
      )}

    </div>
  );

}
export default ReportComponent;
