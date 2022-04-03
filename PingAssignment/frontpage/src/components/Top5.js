import { useEffect, useState } from "react";
import { getTop5 } from "../api/api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const Top5 = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getTop5().then((data) => {
      if (data.success) {
        setRows(data.data);
        console.log(data);
      }
    });
  }, []);

  return (
    <div style={{ color: "white" }} className="row mt-3">
      <div className="col-2 offset-5">
        <Typography variant="h4" className="mb-3 center">
          Top 5
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">HostName</TableCell>
              <TableCell align="right">count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.hostname}>
                <TableCell component="th" scope="row">
                  {row.hostname}
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Top5;
