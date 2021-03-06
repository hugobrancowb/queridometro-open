import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import * as FirebaseService from '../services/FirebaseService';
import SelectUser from '../components/selectUser/selectUser';
import Vote from '../components/vote/vote';
import { Emoji, User } from '../models/models';

export default function Home() {
  const [user, setUser] = useState<string | number>(null);
  const [selectedState, setSelectedState] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [emojisList, setEmojisList] = useState<Emoji[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  /**
   * Função chamada ao carregar a página.
   */
  const onRender = (): void => {
    FirebaseService.GETUsers().then(usersList => {
      setUserList(usersList);
      FirebaseService.GETEmojis().then(emojiList => {
        setEmojisList(emojiList);
      });
    });
  };

  /**
   * Reage à mudança gatilhada pela escolha de usuário.
   *
   * @param event Evento disparado pela modificação do select.
   */
  const handleUserSelect = (event: any): void => {
    const selectedUser = event.target.value;
    setUser(selectedUser);
  };

  /**
   * Registra cada voto construindo o body da requisição dinamicamente.
   * @param userName
   * @param emojiSymbol
   */
  const handleVoting = (userName: string, emojiSymbol: string): void => {
    userList
      .filter(user => user.name === userName)
      .forEach(user => {
        user.emojiList.map(emoji => {
          emoji.votes = emoji.symbol === emojiSymbol ? 1 : 0;
          return emoji;
        });
      });

    setUserList([...userList]);
  };

  /**
   * Registra os votos do queridômetro no banco.
   * @param event
   */
  const handleSubmit = (event: any) => {
    console.log(userList);
  };

  /**
   * Cria objeto utilizado para contabilizar votos do queridômetro ao
   * associar os emojis pré-definidos aos usuários cadastrados no sistema.
   *
   * @param userList
   * @param emojiList
   * @return Lista de usuários com 0 votos em todas reações.
   */
  const buildNewVoteObject = (userList: User[], emojiList: Emoji[]): User[] => {
    if (emojiList) {
      return userList.map(user => {
        user.emojiList = JSON.parse(JSON.stringify(emojiList));
        return user;
      });
    }
    return [];
  };

  useEffect(onRender, []);
  useEffect(() => {
    if (user !== null) {
      const _users = userList.filter(u => u.name !== user);
      setFilteredUserList(buildNewVoteObject(_users, emojisList));
      setSelectedState(true);
    }
  }, [user]);
  
  const voteProps = {filteredUserList, handleVoting, handleSubmit, showAlert, setShowAlert};

  /**
   * PÁGINA.
   */
  return (
    <div className="container">
      <Head>
        <title>Queridômetro Justa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Queridômetro Justa</h1>

        {SelectUser(user, userList, handleUserSelect)}

        {selectedState
          ? Vote({...voteProps})
          : null}
      </main>
    </div>
  );
}
