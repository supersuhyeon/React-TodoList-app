## React TodoList app

![ezgif com-gif-maker (46)](https://user-images.githubusercontent.com/94214512/201792141-75380662-9152-4018-b533-6e2b475371cd.gif)<br>
Here is the upgraded version of a habit tracker app that I made before.
This is an upgraded version of a habit tracker app that I previously made.
I was able to practice function-type Components, React hooks and save a data in localstorage with this project. <br>
[TodoListApp](https://willowy-blancmange-3236fd.netlify.app/)

### Goals of the project

1. Build Components hierarchy
2. Practice ReactHooks - useState, useContext for darkmode, useEffect
3. Use PostCSS and personal opinion for CSS libraries
4. save data in window.localStorage

### Languages

React, PostCSS

### Features

**1. Build components**
<br>
<br>
![reactcomponents](https://user-images.githubusercontent.com/94214512/201803025-47f8104a-6adc-4ac6-a294-b1ef111d0255.png)<br>

1. 3 filter states :

- All - shows all the data based on user's input and whether checkbox is checked or not <br>
- Active - only unchecked tasks <br>
- Completed - only checked tasks <br>

2. Each component represents :

- App (orange box) : contains the entirety of the project and update filter state<br>
- Header(red box) : sets filter state based on what user clicked<br>
- TodoList(blue box) : filters and displays the data collection according to the filter state <br>
- Todo(turquoise box) : changes the data status based on the checkbox state and deletes the data<br>
- AddTodo(yellow box) : adds the data based on user's input<br>

<br>

**2. Practice ReactHooks - useState, useContext for darkmode, useEffect**<br>

**- useContext**<br>
![ezgif com-gif-maker (47)](https://user-images.githubusercontent.com/94214512/201830381-0617caf2-d760-45c7-ba4f-b73ced1cc833.gif) <br>
Instead of prop drilling, it is good to use useContext for accessing global data and re-rendering when
the global data changes. <br>
<br>
How to use<br>

1. Make a new file and create context<br>
2. Wrap child components in the context provider and supply the status value<br>
3. Use the useContext hook in a child component<br>

```js
//DarkModeContext.jsx
const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((darkMode) => {
      return !darkMode;
      updateDarkMode(!darkMode);
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );

  function updateDarkMode(darkMode) {
    if (darkMode) {
      //true
      document.documentElement.classList.add("dark");
    } else {
      //false
      document.documentElement.classList.remove("dark");
    }
  }

  export const useDarkMode = () => useContext(DarkModeContext);
}
```

```js
//App.js
const filters = ["all", "active", "completed"];

function App() {
  const [filter, setFilter] = useState(filters[0]);

  return (
    <>
      <DarkModeProvider>
        <Header
          filters={filters}
          filter={filter}
          onFilterChange={(filter) => setFilter(filter)}
        ></Header>
        <TodoList filter={filter}></TodoList>
      </DarkModeProvider>
    </>
  );
}

export default App;
```

```js
//Header.jsx
export default function Header({ filter, filters, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const handleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <header className={styles.header}>
      <button onClick={handleDarkMode} className={styles.toggle}>
        {!darkMode && <MdDarkMode></MdDarkMode>}
        {darkMode && <MdLightMode></MdLightMode>}
      </button>
      <ul className={styles.filters}>
        {filters.map((value, index) => {
          return (
            <li key={index}>
              <button
                className={`${styles.filter} ${
                  filter === value && styles.selected
                }`}
                onClick={() => {
                  return onFilterChange(value);
                }}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
```

```css
/* index.css */

:root {
  --color-bg-dark: #f5f5f5;
  --color-bg: #fdfffd;
  --color-gray: #d1d1d1;
  --color-text: #22243b;
  --color-accent: #f16e03;
  --color-white: white;
  --color-scrollbar: #aaa7a7;
}

html.dark {
  --color-bg-dark: #1a1c35;
  --color-bg: #22243b;
  --color-grey: #4e4e4e;
  --color-text: #fdfffd;
}
```

**- useEffect** <br>
Create lifecycle methods using useEffect

1. If there is no second parameter then the callback function will render whenever the component renders<br>
2. If there is a second parameter [state], useEffect's callback function will render once after the component is mounted and whenever [state] updates<br>
3. If there is a second parameter within the empty array, useEffect's callback function will only render once when the component is mounted<br>
4. You can execute a function when the component is unmounted using return ()=>{}<br>

![ezgif com-gif-maker (48)](https://user-images.githubusercontent.com/94214512/201832811-9eb6eefa-22cb-4b99-b6d4-7a3afab52368.gif)

```js
useEffect(() => {
  todoRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
}, [todo]); //whenever props.todo is updated, useEffect's callback is executed.
```

By using useEffect, users can automatically see the latest list that they added without having to manually scroll to the end.
<br>
<br>
**3. Use PostCSS** <br>
I have used different CSS libraries across several projects such as PostCSS, styled-components, and tailwindCSS. These are some of my personal observations. <br>

|                   | CSS       | Pros                                                                    | Cons                                                               |
| ----------------- | --------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| CSS Module        | pure CSS  | use anywhere, independence (no conflict with class names)               | create each module.css file                                        |
| Styled Components | CSS in JS | independence (no conflict with class names)                             | Hard to read (all the logics are in one file), compiled at runtime |
| Tailwind          | pure CSS  | use anywhere, well-organized design system, good for a personal project | styling and HTML are mixed                                         |

After I used these 3 different CSS libraries, I believe that PostCSS is great for all projects and easy to approach. Tailwind took me some time to understand how to use but I think that it would be good for personal projects or small projects because they can be finished faster due to the organized design system. It was convenient to use styled components because I don't have to go back and forth between different files but I'm worried about performance due to recompiling at runtime. I will use Tailwind for the next project <br>
<br>
**4. Save data in Local storage**<br>
When we use window.localStorage, we can save the key-value across browser sessions.
This means that when the user clicks the refresh button, the data that the user inputs will be saved.

How to use

- window.localStorage.setItem(key,value) - To add key and value
- window.localStorage.getItem(key) - To read the value
- Only strings are stored in localStorage. Therefore, to store an object or an array in localStorage,
  you need to convert the object to a string and store it. JSON.stringify() converts objects and arrays to JSON strings.
- When you convert JSON strings to objects or arrays, you can use JSON.parse()

```js
//TodoList.jsx
export default function TodoList({filter}){
    const [todos, setTodos] = useState(()=>{return readTodosFromLocalStorage()})

    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos))
    },[todos])

    return(
        //...codes
    )

    function readTodosFromLocalStorage(){
    const todos = localStorage.getItem('todos')
    return todos ? JSON.parse(todos) : []
}
```

### Reference links

[React icons](https://react-icons.github.io/react-icons/search?q=restart)<br>
[tailwind docs](https://tailwindcss.com/docs/installation)<br>
[React useContext Hook](https://www.w3schools.com/react/react_usecontext.asp)<br>
[My Korean Blog for how touse ReactHooks](https://blog.naver.com/thvldk0025/222915330089)<br>
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)<br>
[postCSS](https://postcss.org/)<br>
[dreamcoding](https://academy.dream-coding.com/)<br>
[thinking in react](https://reactjs.org/docs/thinking-in-react.html)<br>

### Self-reflection

I think planning out and building a components hierarchy is the most difficult part before coding.
It was hard for me to divide components into smaller components at the beginning but after I realized its maintainability and reusability benefits, ideally that each component has only one task, I tried my best to divide components even though it takes a lot of time.
While learning and coding in React, I identified the parts of JavaScript's grammar that I could study more and reinforce.
Thanks to this React project, I've been posting a lot about Javascript grammar in my blog. Some things I've written about include: array APIs, spread operator, shallow copy concept, and destructuring. I'm hopeful that I can begin thinking in the React way more!
