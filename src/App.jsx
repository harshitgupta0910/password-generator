import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [len, setLen] = useState(4);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState('');
  const [strength, setStrength] = useState(0); // For password strength
  const [copied, setCopied] = useState(false); // To track the button color change
  const [darkMode, setDarkMode] = useState(true); // For Dark Mode Toggle

  const passRef = useRef(null);
  const passGen = useCallback(() => {
    let Password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (num) str += '0123456789';
    if (char) str += '!#$%&()*+,-./:;<=>?@[\\]^_{|}~';

    for (let i = 1; i <= len; i++) {
      let ch = Math.floor(Math.random() * str.length);
      Password += str.charAt(ch);
    }

    setPass(Password);
  }, [len, num, char]);

  const copyToclip = useCallback(() => {
    window.navigator.clipboard.writeText(pass);
    setCopied(true);

    // Reset the button color after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [pass]);

  const evaluateStrength = useCallback((password) => {
    let strengthScore = 0;

    if (password.length >= 8) strengthScore++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strengthScore++;
    if (/\d/.test(password)) strengthScore++;
    if (/[!#$%&()*+,-./:;<=>?@[\\^_|}{~]/.test(password)) strengthScore++;

    
    setStrength(strengthScore);
  }, []);

  useEffect(() => {
    passGen();
  }, [len, num, char, passGen]);

  useEffect(() => {
    evaluateStrength(pass);
  }, [pass, evaluateStrength]);

  return (
    <>
      <div
        className= {` w-full max-w-md mx-auto my-52 shadow-md  rounded-lg px-4 py-6 ${
          darkMode ? 'bg-slate-800 text-orange-500' : 'bg-white text-zxxc'
        } `}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center my-3">PASSWORD GENERATOR</h1>
          
          {/* Light/Dark Mode Toggle Switch */}
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="hidden"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div
                className={`block bg-asdf w-14 h-8 rounded-full ${
                  darkMode ? 'bg-asdf' : 'bg-green-600'
                }`}
              ></div>
              <div
                className={`dot absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition ${
                  darkMode ? 'transform translate-x-full' : ''
                }`}
              ></div>
            </div>
            <span className="ml-2 ">{darkMode ? ' Dark Mode' : ' Light Mode'}</span>
          </label>
        </div>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className={`outline-none w-full py-1 px-3 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
            }`}
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyToclip}
            className={`outline-none px-3 py-0.5 shrink-0 ${
              copied
                ? 'bg-customGreen'
                : darkMode
                ? 'bg-customPurple'
                : 'bg-customRose'
            } text-white`}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Password Strength Meter */}
        <div className="mb-4">
          <div
            className={`h-2 w-full rounded-full ${
              strength === 1
                ? 'bg-red-500'
                : strength === 2
                ? 'bg-yellow-500'
                : strength === 3
                ? 'bg-green-500'
                : strength === 4
                ? 'bg-blue-500'
                : 'bg-gray-500'
            }`}
            style={{ width: `${(strength / 4) * 100}%` }}
          ></div>
          <p className="text-sm mt-1">
            {strength === 1
              ? 'Weak'
              : strength === 2
              ? 'Medium'
              : strength === 3
              ? 'Strong'
              : strength === 4
              ? 'Very Strong'
              : 'Too Short'}
          </p>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={100}
              value={len}
              className="cursor-pointer"
              onChange={(e) => {
                setLen(e.target.value);
              }}
            />
            <label> Length: {len}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
    </div>
    <footer
        className={`w-52 text-center px-5 mx-24 py-4 mt-8  rounded-full ${
          darkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-customPurple'
        }`}
      >
        <p>Made by : Harshit</p>
      </footer>
</>
  );
}

export default App;
