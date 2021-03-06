import { Emoji } from '../../models/models'

export default function Emoji(emoji: Emoji) {
  return(
      <span
          className="emoji"
          role="img"
          aria-label={emoji.label ?? ""}
          aria-hidden={emoji.label ? "false" : "true"}
      >
        { emoji.symbol }
    </span>
  )
}
