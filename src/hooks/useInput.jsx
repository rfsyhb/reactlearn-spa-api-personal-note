import React from "react";

function useInput(initialValue) {
  const [value, setValue] = React.useState(initialValue);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  // akan return array
  return [value, onChangeHandler];
}

export default useInput;
