import 'bootstrap/dist/css/bootstrap.min.css';
import style from './index-style.module.css'
import Head from 'next/head'
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as FirebaseService from '../services/FirebaseService'
import { User } from "../models/models";
import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter();
  
  const [user, setUser] = useState(-1);
  const [userList, setUserList] = useState([]);
  
  /**
   * Função chamada ao carregar a página.
   */
  const onRender = (): void => {
    FirebaseService.GETUsers()
        .then(usersList => setUserList(usersList))
  };
  useEffect(onRender, []);
  
  /**
   * Reage à mudança gatilhada pelo Select.
   *
   * @param event Evento disparado pela modificação do select.
   */
  const handleUserSelect = (event: any): void => {
    const selectedUser = event.target.value;
    
    setUser(selectedUser);
    filterSelectedUser(selectedUser);
    router.push('/vote')
  }
  
  const filterSelectedUser = (userName: string): User[] => {
    return userList.filter(user => user.name !== userName);
  }
  
  /**
   * PÁGINA.
   */
  return (
      <div className="container">
        <Head>
          <title>Queridômetro Justa</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        
        <main>
          <h1 className="title">
            Queridômetro Justa
          </h1>
          
          <div className={ style.userSelect }>
            <Form>
              <Form.Group className={ style.formGroup } controlId='selectUser'>
                <Form.Label>Quem é você?</Form.Label>
                <Form.Control as='select' value={ user } onChange={ handleUserSelect } >
                  <option disabled value={-1} key={-1}>Busque seu nome</option>
                  {
                    userList.map((user, index) =>
                        <option value={ user.name } key={ user.name }>
                          { user.label }
                        </option>)
                  }
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        
        </main>
      </div>
  )
}
