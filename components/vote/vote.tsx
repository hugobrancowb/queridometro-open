import { Button } from '../../dummy-system';
import Emoji from '../emoji/emoji';

export default function Vote(voteProps) {
  const { form, filteredUserList } = voteProps;

  return (
    <form
      onSubmit={form.handleSubmit}
      className={`py-4 container w-full md:max-w-lg md:mx-auto flex flex-col justify-center grid grid-rows-${filteredUserList.length}`}
    >
      {filteredUserList.map(user => (
        <div
          className={`row justify-center grid text-2xl items-center py-2 gap-1 grid-cols-11 border-l-4
          ${
            form?.errors[user.name] && form?.touched[user.name]
              ? 'border-red-600'
              : 'border-transparent'
          }`}
          key={user.name}
        >
          {/* Foto do participante */}
          <div className="col-span-2 flex justify-center">
            <div
              className="w-1/2 p-6 shadow rounded-full"
              style={{
                background: `url("${user?.photo}") no-repeat center center`,
                backgroundSize: 'cover',
              }}
            />
          </div>

          {/* Lista de emojis/reações */}
          {user.emojiList.map(emoji => (
            <Emoji
              key={user?.name + emoji?.label}
              emoji={emoji}
              user={user}
              form={form}
            />
          ))}
        </div>
      ))}

      <div className="flex justify-center w-full pt-4 md:max-w-xs md:mx-auto grid grid-cols-8 gap-1">
        <input
          placeholder="Palavra-chave"
          name="password"
          type="password"
          onChange={form.handleChange}
          className={`col-span-5 rounded-md ${
            form.errors?.password && form.touched?.password
              ? 'border-red-600'
              : ''
          }`}
        />
        <Button primary type="submit" className="col-span-3">
          Enviar
        </Button>
      </div>
    </form>
  );
}
