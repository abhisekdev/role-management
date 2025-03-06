import { useThemeColor } from './useThemeColor'

export const useSelect = () => {
  const {
    primaryBlueText,
    primaryTextColor,
    primaryBgColor,
    secondaryTextInverse,
    secondaryBgColor,
    grayBorderColor
  } = useThemeColor([
    'primaryBlueText',
    'primaryTextColor',
    'primaryBgColor',
    'secondaryTextInverse',
    'secondaryBgColor',
    'grayBorderColor'
  ])

  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      color: primaryTextColor,
      overflow: 'hidden',
      padding: '0 6px',
      opacity: state.isDisabled ? 0.5 : 1,
      maxWidth: 'inherit',
      minWidth: 'inherit',
      minHeight: 'inherit',
      border: 'auto',
      fontSize: '14px',
      backgroundColor: 'transparent',
      '&:hover': {
        borderColor: state.isFocused ? primaryBlueText : grayBorderColor,
        backgroundColor: 'transparent'
      },
      outline: state.isFocused ? `${primaryBlueText} solid 1px` : 'none',
      boxShadow: state.isFocused ? 'none' : baseStyles?.boxShadow,
      borderColor: state.isFocused ? primaryBlueText : grayBorderColor
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 1111,
      backgroundColor: primaryBgColor,
      width: '100%'
    }),
    menuList: (provided) => ({
      ...provided,
      zIndex: 1111,
      backgroundColor: primaryBgColor,
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }),
    input: (provided) => ({
      ...provided,
      color: primaryTextColor,
      backgroundColor: 'transparent'
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      color: secondaryTextInverse,
      backgroundColor: state?.isFocused
        ? 'rgba(0, 0, 0, 0.04)'
        : primaryBgColor,
      textOverflow: 'ellipsis',
      '&:hover': {
        backgroundColor: secondaryBgColor
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: primaryTextColor,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '&:hover': {
        color: primaryTextColor
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#EDF2F7',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textTransform: 'capitalize'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#A0AEC0',
      backgroundColor: 'transparent',
      ':hover': {
        color: '#A0AEC0'
      }
    }),
    dropdownIndicator: (provided) => {
      return {
        ...provided,
        padding: '0 8px 0 0'
      }
    },
    valueContainer: (provided) => {
      return {
        ...provided,
        height: '39px',
        paddingLeft: 'auto'
      }
    },
    placeholder: (provided) => ({
      ...provided,
      color: primaryTextColor
    })
  }

  return { style: selectStyles }
}
