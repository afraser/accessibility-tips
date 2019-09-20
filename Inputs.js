//
// 4. Label your inputs properly
//


// passing ids sucks

const Input = ({ id, label, ...inputProps }) =>
  <React.Fragment>
    <label for={id}>{label}</label>
    <input id={id} {...inputProps} />
  </React.Fragment>


<Input id={completelyAndTotallyUniqueName} {...etc} />


// WRAP your component in a <label>

const Input = ({ label, ...inputProps }) =>
  <label>
    <div>{label}</div>
    <input {...inputProps} />
  </label>


const Select = ({ label, children, options, ...inputProps }) =>
  <label>
    <div>{label}</div>
    <select {...inputProps}>
      { children || renderOptions(options)}
    </select>
  </label>


const Checkbox = ({ label, ...inputProps}) =>
  <label>
    <input type='checkbox' {...inputProps} />
    <span>{label}</span>
  </label>


const RadioGroup = ({ options, value, onChange, label, className, name}) =>
  <fieldset>
    <div>{label}</div>
    {
      options.map(option =>
        <label key={option.label}>
          <input
            type='radio'
            checked={option.value === value}
            value={option.value}
            onChange={onChange}
            name={name}
          />
          {option.label}
        </label>
      )
    }
  </fieldset>
