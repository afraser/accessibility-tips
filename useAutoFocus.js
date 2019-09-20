//
// useAutoFocus hook
//
// see: https://codesandbox.io/s/github/kensnyder/react-hook-use-autofocus

function useAutoFocus() {
  const ref = useRef()

  useEffect(() => { ref.current.focus() }, [ref])

  return ref
}


// USAGE

<Input
  type="text"
  value={item.text}
  onChange={changeItemText}
  ref={useAutofocus()}
/>
