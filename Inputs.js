//
// 4. Label your inputs properly
//


// passing ids sucks

const Input = ({ id, error, label, ...inputProps }) =>
  <React.Fragment>
    <label for={id}>{label}</label>
    <input id={id} aria-invalid={!!error} {...inputProps} />
    <FormError error={error}/>
  </React.Fragment>


<Input id={completelyAndTotallyUniqueName} {...etc} />


// WRAP your component in a <label>

const Input = ({ label, error, ...inputProps }) =>
  <label>
    <div>{label}</div>
    <input aria-invalid={!!error} {...inputProps} />
    <FormError error={error}/>
  </label>


const Select = ({ label, children, options, error, ...inputProps }) =>
  <label>
    <div>{label}</div>
    <select aria-invalid={!!error} {...inputProps}>
      { children || renderOptions(options)}
    </select>
    <FormError error={error}/>
  </label>


const Checkbox = ({ label, ...inputProps}) =>
  <label>
    <input type='checkbox' {...inputProps} />
    <span>{label}</span>
  </label>


const RadioGroup = ({ options, value, onChange, label, className, name, error }) =>
  <fieldset>
    <div>{label}</div>
    {
      options.map(option =>
        <label key={option.label}>
          <input
            type='radio'
            aria-invalid={!!error}
            checked={option.value === value}
            value={option.value}
            onChange={onChange}
            name={name}
          />
          {option.label}
        </label>
      )
    }
    <FormError error={error}/>
  </fieldset>
