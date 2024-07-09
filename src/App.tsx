import { ApplicationProvider } from "./context/applicationContext"
import { AppWindow } from "./features"
import theme from "./theme"
import { Box, ThemeProvider } from "@mui/material"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <ApplicationProvider>
            <AppWindow/>
        </ApplicationProvider>  
      </Box>
    </ThemeProvider>
  )
}

export default App
