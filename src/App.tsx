import { ApplicationProvider } from "./context/applicationContext"
import { WatchDogProvider } from "./context/watchDogContext"
import { AppBar, AppWindow } from "./features"
import theme from "./theme"
import { CommandCenterApplication } from "./types"
import { Box, ThemeProvider } from "@mui/material"

function App() {
  const applicationList:CommandCenterApplication[] = [
    {id:0, name:"Watch Dog"}
  ]
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <ApplicationProvider>
            <AppBar appItems={applicationList}/>
            <AppWindow/>
        </ApplicationProvider>  
      </Box>
    </ThemeProvider>
  )
}

export default App
