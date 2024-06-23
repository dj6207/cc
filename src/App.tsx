import { ApplicationProvider } from "./context/applicationContext"
import { UsageDataProvider } from "./context/usageDataContext"
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
          <UsageDataProvider>
            <AppBar appItems={applicationList}/>
            <AppWindow/>
          </UsageDataProvider>
        </ApplicationProvider>  
      </Box>
    </ThemeProvider>
  )
}

export default App
