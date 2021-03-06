import React, { useState } from "react";
import PropTypes from "prop-types";

import { ErrorText, Body } from "../Text/text";
//import Icon from "Components/Icon";
import { InputContainer, StyledInput } from "./styles";

const TextInput = ({
  error,
  placeholder,
  defaultValue,
  label,
  onChange,
  type,
  hasIcon,
  ...otherProps
}) => {
  const defaultIcons = [
    { name: "eye-off", type: "password" },
    { name: "eye-on", type: "text" }
  ];
  // const [displayedIcon, setDisplayedIcon] = useState(defaultIcons[0].name);
  const [inputType, setInputType] = useState(type || "text");

  // const handleIconChange = () => {
  //   const newIcon = defaultIcons.find(e => e.name !== displayedIcon);
  //   setInputType(newIcon.type);
  //   setDisplayedIcon(newIcon.name);
  // };
  return (
    <InputContainer error={error}>
      {/* {hasIcon && (
        <nav onClickCapture={handleIconChange}>
          <Icon name={displayedIcon} />
        </nav>
      )} */}
      {label && <Body>{label}</Body>}
      <StyledInput
        onChange={onChange}
        type={inputType}
        error={error}
        placeholder={placeholder}
        {...otherProps}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  hasIcon: PropTypes.bool
};

export default TextInput;



















// import React, { useState } from "react";
// import PropTypes from "prop-types";

// import { ErrorText, Body, SmallBody } from "../Text/text";
// // import Icon from "components/Icon";
// import { StyledInput, InputContainer, SubLabelContainer } from "./styles";

// const TextInput = ({
//   error,
//   placeholder,
//   defaultValue,
//   label,
//   subLabel,
//   onChange,
//   type,
//   hasIcon
// }) => {
//   const defaultIcons = [
//     { name: "eye-off", type: "password" },
//     { name: "eye-on", type: "text" }
//   ];
//   const [displayedIcon, setDisplayedIcon] = useState(defaultIcons[0].name);
//   const [inputType, setInputType] = useState(type || "text");

//   // const handleIconChange = () => {
//   //   const newIcon = defaultIcons.find(e => e.name !== displayedIcon);
//   //   setInputType(newIcon.type);
//   //   setDisplayedIcon(newIcon.name);
//   // };
//   return (
//     <>
//       <InputContainer error={error}>
//         {/* {hasIcon && (
//           <nav onClickCapture={handleIconChange}>
//             <Icon name={displayedIcon} />
//           </nav>
//         )} */}
//         {label && <Body>{label}</Body>}
//         <StyledInput
//           type={inputType}
//           error={error}
//           placeholder={placeholder}
//           onChange={onChange}
//         />
//         {error && <ErrorText>{error}</ErrorText>}      
//       </InputContainer>
//       { subLabel &&
//         <SubLabelContainer>
//           <SmallBody>{subLabel}</SmallBody>
//         </SubLabelContainer>
//       }
//     </>
//   );
// };

// TextInput.propTypes = {
//   error: PropTypes.string,
//   placeholder: PropTypes.string,
//   label: PropTypes.string,
//   subLabel: PropTypes.string,
//   defaultValue: PropTypes.string,
//   onChange: PropTypes.func,
//   type: PropTypes.string,
//   hasIcon: PropTypes.bool
// };

// export default TextInput;
