export default function EmojiComponent(props) {
  const { user, emoji, form } = props;

  return (
    <>
      <label
        className={`transform flex justify-center
        ${
          form?.values[user.name] === emoji?.symbol
            ? 'blackAndWhite'
            : 'scale-110'
        }`}
        key={emoji?.symbol + user?.name}
      >
        <input
          type="radio"
          name={user.name}
          value={emoji.symbol}
          onChange={form?.handleChange}
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
