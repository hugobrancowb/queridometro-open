import clsx from 'clsx';

export default function EmojiComponent(props) {
  const { user, emoji, form } = props;

  return (
    <>
      <label
        className={clsx('transform flex justify-center', {
          blackAndWhite:
            form?.values[user.name] !== emoji?.symbol && !props?.colorful,
        })}
        key={emoji?.symbol + user?.name}
      >
        <input
          type="radio"
          name={user.name}
          value={emoji.symbol}
          onChange={form?.handleChange}
        />
        <span
          className={clsx('m-2 md:m-5 transition transform', {
            'cursor-pointer hover:scale-125': props?.pointer,
            'hover:text-shadow-lg': props?.withShadow,
          })}
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
