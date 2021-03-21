export default function Emoji(props) {
  const { user, emoji, index, handleVoting } = props;

  return (
    <>
      <label
        className={`transform flex justify-center
        ${emoji?.votes > 0 ? 'scale-110' : 'blackAndWhite'}`}
        key={index}
      >
        <input
          type="radio"
          name={user.label}
          value={emoji.label}
          onChange={() => handleVoting(user.name, emoji.symbol)}
        />
        <span className="cursor-pointer m-5 transition transform hover:text-shadow-xl hover:scale-125">
          {emoji.symbol}
        </span>
      </label>
      <style jsx>{`
        label.blackAndWhite {
          filter: grayscale(100%);
          opacity: 0.5;
        }
        /* HIDE RADIO */
        input[type='radio'] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
      `}</style>
    </>
  );
}
