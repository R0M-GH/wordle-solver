import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FormGroup } from "@material-ui/core";
import React, { useState } from "react";
import Word from "./components/Word";
import Instructions from "./components/Instructions";
import raw from "./words.txt";
import Box from '@mui/material/Box';

let allWords = [];
fetch(raw)
  .then((r) => r.text())
  .then((text) => {
    allWords = text.split("\n");
  });
function App() {
  const [words, setWords] = useState([
    { value: "audio", color: [0, 0, 0, 0, 0], i: 0 },
    { value: "crest", color: [0, 0, 0, 0, 0], i: 1 },
  ]);
  let green = [];
  let yellow = [];
  let gray = [];

  const wo = words.map((word) => (
    <Word words={words} setWords={setWords} index={word.i} />
  ));

  function populateColors() {
    green = [];
    yellow = [];
    gray = [];
    let t = [];
    words.forEach((word) => {
      for (let j = 0; j < 5; j++) {
        if (word.color[j] == 0) {
          gray.push(word.value.charAt(j));
        } else if (word.color[j] == 1) {
          yellow.push(word.value.charAt(j));
        } else {
          green.push([word.value.charAt(j), j]);
        }
      }
    });
    for (let g = 0; g < gray.length; g++) {
      if (green.includes(gray[g]) || yellow.includes(gray[g])) {
        continue;
      } else {
        t.push(gray[g]);
      }
    }
    gray = t;
  }

  function makePrediction() {
    populateColors();
    for (let word = 0; word < allWords.length; word++) {
      let b = false;
      for (let g = 0; g < gray.length; g++) {
        if (allWords[word].includes(gray[g])) {
          b = true;
          break;
        }
      }
      if (b) {
        continue;
      }
      for (let y = 0; y < yellow.length; y++) {
        if (allWords[word].includes(yellow[y]) == false) {
          b = true;
          break;
        }
      }
      if (b) {
        continue;
      }
      for (let g = 0; g < green.length; g++) {
        if (allWords[word].charAt(green[g][1]) != green[g][0]) {
          b = true;
          break;
        }
      }
      if (b) {
        continue;
      }
      for (let w = 0; w < words.length; w++) {
        if (words[w].value == allWords[word]) {
          b = true;
          break;
        }
      }
      if (b) {
        continue;
      }
      setWords([
        ...words,
        { value: allWords[word], color: [0, 0, 0, 0, 0], i: words.length },
      ]);
      break;
    }
  }

  function restart() {
    window.location.reload();
  }

  return (
    <div className="App">
      <Instructions />
      {wo}
      <Box textAlign="center">
        <Button
          variant="contained"
          onClick={makePrediction}
          style={{
            maxWidth: "250px",
            maxHeight: "100px",
            minWidth: "250px",
            minHeight: "100px",
            fontSize: "45px",
            textAlign: "center",
            color: "white",
          }}
          disableElevation
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={restart}
          style={{
            maxWidth: "250px",
            maxHeight: "100px",
            minWidth: "250px",
            minHeight: "100px",
            fontSize: "45px",
            textAlign: "center",
            color: "white",
          }}
          disableElevation
        >
          Restart
        </Button>
      </Box>

    </div>
  );
}

export default App;