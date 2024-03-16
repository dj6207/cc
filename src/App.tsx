import { ApplicationProvider } from "./context/applicationContext"
import { AppBar, AppWindow } from "./features"
import { CommandCenterApplication } from "./types"

function App() {
  const applicationList:CommandCenterApplication[] = [
    {id:0, name:"Watch Dog"}
  ]
  return (
    <div className="flex flex-col h-screen">
      <ApplicationProvider>
        <AppWindow/>
        <AppBar appItems={applicationList}/>
      </ApplicationProvider>
    </div>
  )
}

export default App
