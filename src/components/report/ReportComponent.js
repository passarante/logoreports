import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/index';


const ReportComponent = ({ report }) => {

  const [reportDetail, setReportDetail] = useState(null);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    if (report) {

      axios.get(API_URL + report.sqlQuery).then(res => {
        setReportDetail(res.data);

        if (res.data.length > 0) {
          Object.keys(res.data[0]).forEach(k => console.log(k))
          setTableHeaders(Object.keys(res.data[0]))
        }
      })
    }
    return () => { }
  }, [report])
  return (
    <div>{reportDetail?.length} kayıt sayısı

      {tableHeaders && reportDetail && reportDetail.length > 0 && (
        <table>
          <thead>
            {tableHeaders.map(th => <th>{th}</th>)}
          </thead>
          <tbody>
            {reportDetail.map((r, index) => <tr key={index} >

              {tableHeaders.map((t, tIdx) => <td key={tIdx}>
                {Object.keys(r).forEach((rk, idx) => {
                  if (rk === t) {
                    return <span key={idx}>{r.rk}</span>
                  }
                  return <p>sadsa</p>
                })}
              </td>)}

            </tr>)}
          </tbody>
        </table>
      )}
    </div>
  );

}
export default ReportComponent;
