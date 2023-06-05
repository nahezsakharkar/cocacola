const reactSelectStyles = (error, value) => {
  const style = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: error ? "1px solid #d32f2f" : "1px solid #b2b8c3",
      "&:hover": {
        border: error ? "1px solid #d32f2f" : "1px solid black",
      },
    }),
    placeholder: (baseStyles) => {
      return {
        ...baseStyles,
        color: "#a2a2a2 !important",
      };
    },
    singleValue: (baseStyles) => {
      return {
        ...baseStyles,
        color: value === "" ? "#a2a2a2 !important" : "#333333",
      };
    },
  };
  return style;
};

const constants = {
  reactSelectStyles,
};

export default constants;
