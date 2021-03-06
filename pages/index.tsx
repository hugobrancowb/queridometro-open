import 'bootstrap/dist/css/bootstrap.min.css';
import style from './index-style.module.css'
import Head from 'next/head'
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as FirebaseService from '../services/FirebaseService'
import { User } from "../models/models";
import Vote from "../components/vote/vote";
import SelectUser from "../components/selectUser/selectUser";

export default function Home() {
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
  }
  
  /**
   * Filtra para que a lista não tenha o nome do usuário que está vontado.
   *
   * @param userName Nome do usuário ativo.
   * @returns Lista de usuários filtrada.
   */
  const filterSelectedUser = (userName: string): User[] => {
    return userList.filter(user => user.name !== userName);
  }
  
  /**
   * Informa se um usuário já foi selecionado.
   *
   * @returns Retorna boolean informando se há usuário selecionado.
   */
  const isUserSelected = (): JSX.Element => {
    if ((user === null) || (user === -1)) {
      // Selecionar usuário.
      return SelectUser(user, userList, handleUserSelect);
    }
    // Usuário selecionado. Hora de votar.
    return Vote();
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
  
          { isUserSelected() }
        
        </main>
      </div>
  )
}
