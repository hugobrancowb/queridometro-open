export default function EmojiComponent(props) {
  const { user, emoji, form } = props;

  return (
    <>
      <label
        className={`transform flex justify-center
        ${
          form?.values[user.name] === emoji?.symbol || props?.allColor
            ? ''
            : 'blackAndWhite'
        }`}
        key={emoji?.symbol + user?.name}
      >
        <input
          type="radio"
          name={user.name}
          value={emoji.symbol}
          onChange={form?.handleChange}
        />
        <span
          className={`${
            props?.pointer ? 'cursor-pointer hover:scale-125' : ''
          } m-5 transition transform ${props?.withShadow && 'hover:text-shadow-lg'}`}
        >
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
