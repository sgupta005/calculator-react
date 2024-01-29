import './index.css';
function App() {
  return (
    <>
      <Screen />
      <KeyBoard>
        <AllClearButton />
        <ClearButton />
        <OperationButton operation={'%'} />
        <OperationButton operation={'/'} />
        <Digit digit={7} />
        <Digit digit={8} />
        <Digit digit={9} />
        <OperationButton operation={'+'} />
        <Digit digit={4} />
        <Digit digit={5} />
        <Digit digit={6} />
        <OperationButton operation={'-'} />
        <Digit digit={1} />
        <Digit digit={2} />
        <Digit digit={3} />
        <OperationButton operation={'*'} />
        <Digit digit={0} />
        <Decimalbutton />
        <EqualsButton />
      </KeyBoard>
    </>
  );
}

function Screen() {
  return (
    <div className="screen">
      <input type="text" id="screen-input" />
    </div>
  );
}

function KeyBoard({ children }) {
  return <div className="button-grid">{children}</div>;
}

function OperationButton({ operation }) {
  return <button className="operators">{operation}</button>;
}

function Digit({ digit }) {
  return <button className="digits">{digit}</button>;
}

function AllClearButton() {
  return <button className="all-clear">AC</button>;
}

function ClearButton() {
  return <button className="clear">C</button>;
}

function Decimalbutton() {
  return <button className="decimal">.</button>;
}

function EqualsButton() {
  return <button className="equals">=</button>;
}

export default App;
