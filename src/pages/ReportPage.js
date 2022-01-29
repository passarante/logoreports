import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReportComponent from '../components/report/ReportComponent';

const ReportPage = () => {
  const params = useParams();
  const [report, setReport] = useState({});

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem("@reports"));
    const tReport = reports.filter(r => r.id === params.id)[0];
    setReport(tReport);

  }, [params.id])

  return <div>
    <ReportComponent report={report} />
  </div>;
};

export default ReportPage;

