import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);

  return (
    <section className={dark ? "dark" : ""}>
      <h2>Counter Practice</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(c => Math.max(0, c - 1))}>
        -
      </button>

      <button onClick={() => setCount(c => c + 1)}>
        +
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>

      <h3>Input Practice</h3>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type something"
      />

      <p>You typed: {text}</p>
      <p>Letters: {text.length}</p>

      <button onClick={() => setText("")}>
        Clear
      </button>

      <h3>Theme Practice</h3>

      <button onClick={() => setDark(d => !d)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </section>
  );
}

export default Counter;