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
    filteredUserList,
    handleVoting,
    handleSubmit,
    handlePassword,
    showAlert,
    setShowAlert,
  } = voteProps;

  const photoExample =
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  
  return (
    <>
      <div
        className={`py-4 container w-full md:max-w-lg md:mx-auto flex flex-col justify-center grid grid-rows-${filteredUserList.length}`}
      >
        {filteredUserList.map((user, index) => (
          <div
            className={`row justify-center grid grid-cols-${
              user.emojiList.length + 2
            } text-2xl items-center py-2 gap-1`}
            key={index}
          >
            {/* Foto do participante */}
            <div className="col-span-2 flex justify-center">
              <div
                className="w-1/2 p-6 shadow rounded-full"
                style={{
                  background: `url("${photoExample}") no-repeat center center`,
                  backgroundSize: 'cover',
                }}
              />
            </div>

            {/* Lista de emojis/reações */}
            {user.emojiList.map((emoji, index) =>
              Emoji({ emoji, user, index, handleVoting }),
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full md:max-w-xs md:mx-auto">
        <Button
          primary
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
            Para a segurança das votações, é definida uma palavra-chave diferente para cada votação do queridômetro.
            Digite abaixo a palavra passe do dia.
          </DialogContentText>
          
          <div className='flex justify-center w-full md:mx-auto md:max-w-md'>
          <input className='rounded-md' type='password' onChange={handlePassword}/>
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
          <Button
            autoFocus
            primary
            onClick={e => {
              setShowAlert(false);
              handleSubmit(e);
            }}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
