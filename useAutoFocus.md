# useAutoFocus hook

https://codesandbox.io/embed/react-hook-for-focusing-input-after-component-mounts-g7vdo

useAutoFocus.js

```js
function useAutoFocus() {
  const ref = useRef()
  useEffect(() => { ref.current.focus() }, [ref])
  return ref
}
```

## Usage

```js
<Input
  type="text"
  value={item.text}
  onChange={changeItemText}
  ref={useAutofocus()}
/>
```
