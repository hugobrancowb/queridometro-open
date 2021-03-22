import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Button } from '../../dummy-system';
import Emoji from '../emoji/emoji';

export default function Vote(voteProps) {
  const {
    form,
    filteredUserList,
    handlePassword,
    showAlert,
    setShowAlert,
  } = voteProps;

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

      <div className="flex justify-center w-full md:max-w-xs md:mx-auto">
        <Button
          primary
          type="button"
          onClick={() => {
            setShowAlert(true);
          }}
        >
          Enviar
        </Button>
      </div>

      {/* Alerta de confirmação */}
      <Dialog open={showAlert} aria-labelledby="Confirmação de voto">
        <DialogTitle>Digite a palavra-passe do dia</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para a segurança das votações, é definida uma palavra-chave
            diferente para cada votação do queridômetro. Digite abaixo a palavra
            passe do dia.
          </DialogContentText>

          <div className="flex justify-center w-full md:mx-auto md:max-w-md">
            <input
              className="rounded-md"
              type="password"
              onChange={handlePassword}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            secondary
            onClick={() => {
              setShowAlert(false);
            }}
          >
            Não
          </Button>
          <Button autoFocus primary type="submit" onClick={form.handleSubmit}>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
