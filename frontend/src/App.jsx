import { getHi } from "./core/api"

function App() {

  return (
    <>
    <div className="text-3xl">
      {getHi().then((res)=>console.log(res)).catch((err)=>console.log(err))}
    </div>
    </>
  )
}

export default App
