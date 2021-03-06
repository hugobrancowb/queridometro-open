import style from '../../pages/index-style.module.css';
import { Form } from 'react-bootstrap';
import React, { ChangeEventHandler } from 'react';
import { User } from '../../models/models';

export default function SelectUser(
  user: string | number,
  userList: User[],
  handler: ChangeEventHandler,
) {
  user = user ?? -1;

  /**
   * COMPONENTE.
   */
  return (
    <div className={style.userSelect}>
      <Form>
        <Form.Group className={style.formGroup} controlId="selectUser">
          <Form.Label>Quem é você?</Form.Label>
          <Form.Control as="select" value={user} onChange={handler}>
            <option disabled value={-1} key={-1}>
              Busque seu nome
            </option>
            {userList.map((user, index) => (
              <option value={user.name} key={user.name}>
                {user.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}
