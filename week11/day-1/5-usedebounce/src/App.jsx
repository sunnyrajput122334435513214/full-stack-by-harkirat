// Importing necessary hooks from React
import { useEffect, useState } from "react";

//isme hm ek aesa website bnae hai jb bhi hm time 200ms se jyada lege to exclusive operation run hoga

// Custom hook to debounce the update of a value
const useDebounce = (value, delay) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // useEffect runs whenever `value` or `delay` changes
  useEffect(() => {
      // Set up a timer to update the debounced value after the specified delay
      const handler = setTimeout(() => {
          setDebouncedValue(value);
      }, delay);

      // Cleanup function to clear the timer when `value` or `delay` changes or on component unmount
      return () => {
          clearTimeout(handler);
      };
  }, [value, delay]); // Dependency array ensures effect runs on changes to `value` or `delay`
  
  // Return the debounced value
  return debouncedValue;
};

function App() {
  // State to store the value of the input field
  const [inputVal, setInputVal] = useState("");

  // Using the custom debounce hook to delay the update of the input value
  const debouncedValue = useDebounce(inputVal, 200);

  // Function to handle changes in the input field
  function change(e) {
    setInputVal(e.target.value); // Updates the input value in state
  }

  // useEffect runs whenever the debouncedValue changes
  //uses to track the changes in the debouncedValue
  useEffect(() => {
    console.log("Exclusive Operation"); // Perform an operation based on the debounced value
  }, [debouncedValue]); // Dependency array ensures this effect runs only when debouncedValue changes

  return (
    <>
      {/* Input field to capture user input */}
      <input type="text" onChange={change}></input>
    </>
  );
}

export default App;


// Notes:
// Debounce ek technique hai jo kisi function ke execution ko delay karti hai jab tak ek certain time period complete na ho jaye.
//  Yeh uss situation mein kaam aata hai jab aapko frequent user actions (jaise typing, scrolling, resize events, etc.) ko optimize karna hota hai.
//  React mein debounce ko implement karne ke liye custom hooks ka use kiya jata hai.