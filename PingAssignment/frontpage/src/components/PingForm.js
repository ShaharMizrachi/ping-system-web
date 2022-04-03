import { useState } from "react";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { pingRequest } from "../api/api";
import Top5 from "./Top5";

const PingForm = () => {
  const [hostName, setHostName] = useState("");
  const [count, SetCount] = useState(0);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const response = await pingRequest(hostName, count);
    setResponse(response);
    setLoading(false);
  };

  return (
    <div className="row mt-4 mb-5">
      <div>
        <div className="offset-1 mt-2">
          <Typography variant="h4">Ping Form</Typography>
        </div>
        <div className="row  mt-5 offset-1">
          <Typography variant="h6" className="col-1 mt-2">
            Host:
          </Typography>
          <TextField focused label="Host" value={hostName} onChange={(e) => setHostName(e.target.value)} variant="outlined" className="col-4" />
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-1" style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" className="left" style={{ marginRight: 20 }}>
              Count:
            </Typography>
            <div className="col-10 offset-1">
              <Slider defaultValue={1} fullWidth max={15} value={count} onChange={(e) => SetCount(e.target.value)} valueLabelDisplay="on" />
            </div>
          </div>
        </div>
        <div className="col-2 offset-1 mt-5">
          <Button fullWidth variant="contained" onClick={onSubmit} disabled={loading}>
            Run
          </Button>
        </div>
        <div className="col-5 offset-1 mt-5">
          <Typography variant="h6">Output:</Typography>
          <div style={{ border: "1px solid white", padding: 20 }}>
            <Typography variant="h6">{response && (response.success ? response.data.output : response.message)}</Typography>
          </div>
        </div>
      </div>
      <div className="mt-4 col-12">
        <Top5 />
      </div>
    </div>
  );
};

export default PingForm;
