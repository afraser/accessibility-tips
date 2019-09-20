# Label your inputs properly

### This works, but don't do it
```js
const Input = ({ id, error, label, ...inputProps }) =>
  <React.Fragment>
    <label htmlFor={id}>{label}</label> // htmlFor links label to input
    <input id={id} aria-invalid={!!error} {...inputProps} />
    <FormError error={error}/>
  </React.Fragment>
```

Resulting implementation requires id prop to be unique which is super annoying
```js
<Input id={completelyAndTotallyUniqueName} {...etc} />
```

### DO wrap your component in label
Note: putting error and other text (eg: helper text) inside the <label> will cause it to be read by screenreaders on focus.
This may or may not be desireable. 
Also note the use of `aria-invalid` paired with an optional `error` message prop.
Try out different things in ChromeVox before committing to an implementation.

```js
const Input = ({ label, error, ...inputProps }) =>
  <label>
    <div>{label}</div>
    <input aria-invalid={!!error} {...inputProps} />
    <FormError error={error} /> 
  </label>
```

```js
const Select = ({ label, children, options, error, ...inputProps }) =>
  <label>
    <div>{label}</div>
    <select aria-invalid={!!error} {...inputProps}>
      { children || renderOptions(options)}
    </select>
    <FormError error={error}/>
  </label>
```

```js
const Checkbox = ({ label, ...inputProps}) =>
  <label>
    <input type='checkbox' {...inputProps} />
    <span>{label}</span>
  </label>

```

```js
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
```
