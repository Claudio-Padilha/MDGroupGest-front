import styled from "styled-components";
import ReactSelect from "react-select";
import CONSTANTS from "../../constants";

export const SelectContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  color: ${props =>
    props.error
      ? props.CONSTANTS?.colors.feedback.error.default
      : props.CONSTANTS?.colors.darkBlue};
  > p {
    margin: ${props => props.CONSTANTS?.margin / 2}px 0;
  }
  > div > div {
    align-items: center;
    background-color: #FFF;

    box-shadow: none;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    transition: all 300ms;
    height: 10%;
    color: #88827C;
  }
`;
export const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
    filter: "drop-shadow(0px 4px 13px rgba(193, 188, 183, 0.3))",
    border: `1px solid ${CONSTANTS?.colors.mediumBeige}`,
    marginTop: 3,
    borderRadius: 2
  }),
  indicatorSeparator: () => ({
    display: "none"
  }),
  input: (provided, { isFocused }) => ({
    ...provided,
    minWidth: "150px"
  }),
  control: (provided, { isFocused, isDisabled, ...state }) => ({
    ...provided,
    borderRadius: 2,
    height: 48,
    backgroundColor: isDisabled ? CONSTANTS?.colors.lightBeige : CONSTANTS?.colors.white,
    color: CONSTANTS?.colors.grey,
    boxShadow: "none",
    borderColor: isFocused ? CONSTANTS?.colors.darkBlue : CONSTANTS?.colors.mediumBeige,
    "&:hover": {
      borderColor: isFocused ? CONSTANTS?.colors.darkBlue : CONSTANTS?.colors.mediumBeige
    }
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: CONSTANTS?.colors.lightBeige
  }),

  multiValueLabel: styles => ({
    ...styles,
    color: CONSTANTS?.colors.muted.darkBlue
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: CONSTANTS?.colors.darkBlue,
    ":hover": {
      backgroundColor: CONSTANTS?.colors.darkBlue,
      color: CONSTANTS?.colors.lightBeige
    }
  }),
  option: (provided, state) => {
    const color = state.isDisabled ? CONSTANTS?.colors.grey : CONSTANTS?.colors.darkBlue;
    const backgroundColor = state.isFocused ? CONSTANTS?.colors.lightBeige : CONSTANTS?.colors.white;
    const transition = "opacity 300ms";

    console.log(provided, 'PROVIDED')
    console.log(state, 'STATE')

    return {
      ...provided,
      color,
      transition,
      backgroundColor,
      "&:hover": {
        backgroundColor: CONSTANTS?.colors.lightBeige
      }
    };
  }
};

const Select = styled(ReactSelect)`
  color: ${props =>
    props.error
      ? props.CONSTANTS?.colors.feedback.error.default
      : props.CONSTANTS?.colors.mediumBeige};
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  input {
    font-family: Muli;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }
`;

export default Select;
