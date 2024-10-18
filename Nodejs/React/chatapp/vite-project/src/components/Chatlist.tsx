const Chatlist = ({ messages }: { messages: string[] }): JSX.Element => {
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>{message}</li>
      ))}
    </ul>
  );
};
export default Chatlist;
