import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("url", "api_key");

function App() {
  const [count, setCount] = useState(0)

  async function getLovePoint() {
    const { data } = await supabase.from("love_points").select();
    console.log(data)
  }

  async function getHatePoint() {
    const { data } = await supabase.from("hate_points").select();
    console.log(data)
  }

  
  async function setLovePoint() {
    const { data } = await supabase.from("love_points").insert({name: "Added new value"});
    console.log(data)
  }

  async function editLovePoint() {
    const { data } = await supabase.from("love_points").update({ name: 'Edited value' }).eq('id', '64c137fb-2d91-45c2-b5a7-ae3d845f9aef');
    console.log(data)
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => getLovePoint()}>
          Get Love Points
        </button>
        <button onClick={() => setLovePoint()}>
          Set Love Point
        </button>
        <button onClick={() => editLovePoint()}>
          Edit Love Point
        </button>
        <button onClick={() => getHatePoint()}>
          Get Hate Points
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
