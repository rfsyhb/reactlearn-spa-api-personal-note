import React from "react";

function useInput(intialValue) {
  const [value, setValue] = React.useState(intialValue);

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return [value, onChangeHandler];
}

export default useInput;
