import { useState, useRef, useEffect } from "react";
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
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    gap: 1rem;
  }
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
  font-size: 1.8rem;
`;
const Clock = styled.span`
  font-family: "Oxanium", cursive;
  font-size: 4rem;
  color: ${(props) => (props.minutes > 0 ? "white" : "red")};
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
  const [start, setStart] = useState(false);
  const [startBreak, setStartBreak] = useState(false);
  const [brake, setBrake] = useState(5);
  const [session, setSession] = useState(25);
  const [minutes, setMinutes] = useState(session);
  const [seconds, setSeconds] = useState(0);

  const audio = useRef(null);

  useEffect(() => {
    if (startBreak) {
      setMinutes(brake);
      setSeconds(0);
    }
  }, [startBreak, brake]);
  useEffect(() => {
    if (!startBreak) {
      setMinutes(session);
      setSeconds(0);
    }
  }, [startBreak, session]);
  useEffect(() => {
    const interval = setInterval(() => {
      start && timer();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });
  const timer = () => {
    if (minutes === 0 && seconds === 0) {
      setStartBreak(!startBreak);
      audio.current.play();
      return;
    }

    if (seconds === 0 && minutes >= 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      return;
    }
    if (minutes >= 0) {
      setSeconds(seconds - 1);
      return;
    }
  };

  const reset = () => {
    setMinutes(25);
    setSession(25);
    setSeconds(0);
    setBrake(5);
    setStart(false);
    setStartBreak(false);
    audio.current.pause();
    audio.current.currentTime = 0;
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
        <Name id="timer-label">{!startBreak ? "session" : "break"}</Name>
        <Clock id="time-left" minutes={minutes}>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </Clock>
      </Timer>
      <ControlTimer>
        {start ? (
          <Btn id="start_stop" onClick={() => setStart(false)}>
            <i className="uil uil-play"></i>
          </Btn>
        ) : (
          <Btn id="start_stop" onClick={() => setStart(true)}>
            <i className="uil uil-play"></i>
          </Btn>
        )}

        <Btn id="reset" onClick={reset}>
          <i className="uil uil-sync"></i>
        </Btn>
      </ControlTimer>
      <audio
        id="beep"
        ref={audio}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </Container>
  );
}

export default App;
