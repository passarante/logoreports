import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/index';


const ReportComponent = ({ report }) => {

  const [reportDetail, setReportDetail] = useState(null);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    if (report) {
      console.log(report);
      axios.get(API_URL + report.sqlQuery).then(res => {
        setReportDetail(res.data);

        if (res.data.length > 0) {

          setTableHeaders(Object.keys(res.data[0]))
        }
      })
    }

  }, [report])
  return (
    <div>{reportDetail?.length} kayıt sayısı

      {tableHeaders && (<ul>
        {tableHeaders.map(th => <li>{th}</li>)}
      </ul>)}
    </div>
  );

}
export default ReportComponent;
