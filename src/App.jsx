import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Back from "./assets/blob-scene-haikei.svg";
import Control from "./components/Control";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${Back});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
const Title = styled.h1`
  font-size: 3rem;
  color: white;
  background-color: #004cbb;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
`;
const LengthC = styled.div`
  display: flex;
  gap: 5rem;
`;
const Timer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #004cbb;
  padding: 1.5rem 2rem;
  border-radius: 2rem;
`;
const Name = styled.h2`
  color: white;
  font-size: 1.5rem;
`;
const Clock = styled.span`
  font-size: 4rem;
  color: white;
`;
const ControlTimer = styled.div`
  display: flex;
  gap: 1rem;
`;
const Btn = styled.button`
  border: none;
  background: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  background-color: #004cbb;
  border-radius: 50%;
  padding: 0.5rem;
`;
function App() {
  const [start, setStart] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [brake, setBrake] = useState(5);
  const [session, setSession] = useState(25);

  const play = () => {
    timer();
    setStart(setInterval(timer, 1000));
  };
  const timer = () => {
    if (seconds == 0 && minutes != 0) {
      console.log("holas");
      setSeconds(60);
      setMinutes(minutes - 1);
      setSeconds(seconds - 1);
    }
  };

  const reset = () => {
    setMinutes(25);
    setSession(25);
    setSeconds(0);
    setBrake(5);
    setStart(false);
  };

  return (
    <Container>
      <Title>25 + 5 Clock</Title>
      <LengthC>
        <Control
          id={"break-label"}
          idText={"break-length"}
          name={"Break Length"}
          text={brake}
          idIncrement={"break-increment"}
          idDecrement={"break-decrement"}
          funtion={setBrake}
        />
        <Control
          id={"session-label"}
          idText={"session-length"}
          name={"Session Length"}
          text={session}
          idIncrement={"session-increment"}
          idDecrement={"session-decrement"}
          funtion={setSession}
        />
      </LengthC>
      <Timer>
        <Name id="timer-label">Session</Name>
        <Clock id="time-left">
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </Clock>
      </Timer>
      <ControlTimer>
        <Btn id="start_stop" onClick={play}>
          <i className="uil uil-play"></i>
        </Btn>

        <Btn id="reset" onClick={reset}>
          <i className="uil uil-sync"></i>
        </Btn>
      </ControlTimer>
    </Container>
  );
}

export default App;
