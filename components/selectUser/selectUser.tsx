import React, { ChangeEventHandler } from 'react';
import { User } from '../../models/models';

export default function SelectUser(
  user: string | number,
  userList: User[],
  handler: ChangeEventHandler,
) {
  user = user ?? -1;

  return (
    <form>
      <div className="w-full md:max-w-xs md:mx-auto grid grid-rows-2">
        <label
          htmlFor="selectedUser"
          className={`text-center`}
        >
          Quem é você?
        </label>
        <select
          id="selectedUser"
          className="rounded-md"
          onChange={handler}
          value={user}
          disabled={!(userList.length > 0)}
        >
          <option disabled value={-1} key={-1}>
            Busque seu nome
          </option>
          {userList.map((user, index) => (
            <option value={user.name} key={user.name}>
              {user.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
