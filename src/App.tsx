import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const [title, setTitle] = useState("Hello World!");

  return (
    <Box>
      <Typography variant="h1" color="primary">
        {title}
      </Typography>
      <Button onClick={() => setTitle("New Title")}>Change title</Button>
    </Box>
  );
}

export default App;
