import React, { memo, FC, useState } from "react"
import "./App.css"


interface WrapperProps {
  columns: number;
  rows: number;
}

interface StateProps {
  filter: any;
  setFilter: Function;
}
interface ColorProps {
  key: string;
  color: string;
  width: number;
  rows: number;
}

//function for generate color
function generateColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

const ColorWrapper: FC<WrapperProps> = memo(({ columns, rows }) => {
  
  //generate array for looping
  const verticalMap: Array<number> = Array.from(Array(columns).keys())
  const horizontalMap: Array<number> = Array.from(Array(rows).keys())
  //calculate width by columns and spent 1% for space eachother
  const width = ((100 - (columns - 1))/columns)

  return (
    <div className="wrapper">
    {horizontalMap.map(x => (
      verticalMap.map(y => (
        <Color key={`${x}-${y}`} color={generateColor()} width={width} rows={rows} />
      ))         
    ))}
    </div>
  )
})

const Color: FC<ColorProps> = ({ color, width, rows }) => (
  <div className="color" style={{ backgroundColor: color, width: width+'%', height: (window.innerHeight - 70)/rows }}>
    {color}
  </div>
)

const Filter: FC<StateProps> = ({ filter, setFilter }) => {

  return (
    <div className="filter">
      <Select filter={filter} setFilter={setFilter} />
      <Checkbox filter={filter} setFilter={setFilter} />
    </div>
  )
}

const Select: FC<StateProps> = ({ filter, setFilter }) => {

  const color: Array<{label: string, color: string }> = [
    {label: "red", color: "#ff0000"},
    {label: "green", color: "#008000"},
    {label: "yellow", color: "#ffff00"},
    {label: "blue", color: "#0000ff"},
    {label: "brown", color: "#a52a2a"},
    {label: "gray", color: "#808080"},
    {label: "purple", color: "#800080"},
    {label: "pink", color: "#ffc0cb"},
    {label: "other", color: ""},
  ]

  return (
    <select value={filter.color} onChange={e => setFilter({ ...filter, color: e.target.value })}>
      {color.map(col => (
        <option key={col.label} value={col.color}>{col.label}</option>
      ))}
    </select>
  )
}

const Checkbox: FC<StateProps> = ({ filter, setFilter }) => {  
  return (
    <label className="checkbox">
      <input type="checkbox" checked={filter.darker} onChange={() => setFilter({ ...filter, darker: !filter.darker })} />      
      Darker
    </label>
  )
}

function App() {
  //define columns and rowsfor color
  const columns: number = 5
  const rows: number = 8

  const [filter, setFilter]  = useState({
    color: "",
    darker: false,
    darkerRate: '0'
  })

  return (
    <div className="App">
        <h1>Gallery color</h1>
        <Filter filter={filter} setFilter={setFilter} />
        <ColorWrapper columns={columns} rows={rows} />
    </div>
  )
}

export default memo(App)
