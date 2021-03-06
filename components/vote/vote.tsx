import { User } from '../../models/models';
import { Button, Col, Row } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function Vote(voteProps) {
  const {
    filteredUserList,
    handleVoting,
    handleSubmit,
    showAlert,
    setShowAlert,
  } = voteProps;

  /**
   * COMPONENTE.
   */
  return (
    <>
      <div className="container-fluid d-flex justify-content-center flex-column">
        {filteredUserList.map((user, index) => (
          <div className="d-flex userRow flex-row" key={index}>
            {/* Nome do participante */}
            <Col xs={3} className="d-flex justify-content-end">
              <span className="userName">{user.label}</span>
            </Col>

            {/* Lista de emojis/reações */}
            <Col xs={9} className="d-flex">
              {user.emojiList.map((emoji, index) => (
                <label
                  className={emoji?.votes > 0 ? '' : 'blackAndWhite'}
                  key={index}
                >
                  <input
                    type="radio"
                    name={user.label}
                    value={emoji.label}
                    onChange={() => handleVoting(user.name, emoji.symbol)}
                  />
                  <span className="emoji">{emoji.symbol}</span>
                </label>
              ))}
            </Col>
          </div>
        ))}

        <Row>
          <Col xs={2}></Col>
          <Col xs={10} className="d-flex justify-content-center">
            <Button
              onClick={() => {
                setShowAlert(true);
              }}
            >
              Enviar
            </Button>
          </Col>
        </Row>
      </div>

      {/* Alerta de confirmação */}
      <Dialog open={showAlert} aria-labelledby="Confirmação de voto">
        <DialogTitle>Você confirma seus votos?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você não poderá alterar seus votos depois de confirmar. Deseja
            prosseguir?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              setShowAlert(false);
            }}
          >
            Não
          </Button>
          <Button
            autoFocus
            color="primary"
            onClick={(e) => {
              setShowAlert(false);
              handleSubmit(e)
            }}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>

      <style jsx>{`
        .userRow {
          font-size: 22px;
          margin: 10px auto;
        }
        .userName {
          margin-right: 5px;
          text-align: right;
          position: relative;
          top: 5px;
        }
        label,
        .emoji {
          margin: 5px;
          cursor: pointer;
          transition: all 0.05s ease-in-out;
        }
        label:hover,
        .emoji:hover {
          transform: scale(1.2);
          text-shadow: 0px 1px 2px rgb(0 0 0 / 30%);
        }
        label {
          filter: none;
          opacity: 1;
        }
        label.blackAndWhite {
          filter: grayscale(100%);
          opacity: 0.8;
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
