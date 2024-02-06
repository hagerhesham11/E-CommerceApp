import { createContext, useState } from "react";

export let counterContext = createContext()


export default function CounterCountextProvider(props){
let [counter ,setCounter] = useState(0)
//let [userName , setUserName] = useState("")  

  function increaseCounter(){
    setCounter(counter+1)
  }
  function decreaseCounter(){
    setCounter(counter-1)
  }

  return  <counterContext.Provider value={{counter ,increaseCounter ,decreaseCounter}}>
    {props.children}
    </counterContext.Provider>
   
}