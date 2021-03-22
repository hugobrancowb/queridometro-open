import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import * as FirebaseService from '../services/FirebaseService';
import SelectUser from '../components/selectUser/selectUser';
import Vote from '../components/vote/vote';
import { Emoji, User } from '../models/models';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Home() {
  const [user, setUser] = useState<string | number>(null);
  const [selectedState, setSelectedState] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [password, setPassword] = useState<string>(null);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [emojisList, setEmojisList] = useState<Emoji[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [validationSchema, setValidationSchema] = useState<any>(Yup.object().shape({}))

  const pageTitle = 'Queridômetro';
  
  const form = useFormik({
    initialValues: null,
    onSubmit: values => {
      setShowAlert(false);
      console.log('values: ', values);
      console.log('is valid: ', form.isValid);
      console.log('schema: ', form);
    },
    validationSchema: validationSchema,
    validateOnChange: true,
  });

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
   * Altera a senha usada para votar.
   * @param event
   */
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
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

  /** Reconstroi o formulário cada vez que um usuário diferente é selecionado. */
  const buildForm = useCallback(
    (filteredUserList: User[]) => {
      const _initialValues = {};
      filteredUserList.forEach(user => {
        _initialValues[user.name] = null;
      });

      form.setValues(_initialValues);

      console.log('build: ', form);
    },
    [filteredUserList],
  );
  
  const buildValidationSchema = useCallback((filteredUserList: User[]) => {
    const _validationSchema = {};
  
    filteredUserList.forEach(user => {
      _validationSchema[user.name] = Yup.string().required("Campo obrigatório");
    });
    
    setValidationSchema(Yup.object().shape(_validationSchema));
  }, [filteredUserList]);

  useEffect(onRender, []);
  useEffect(() => {
    if (user !== null) {
      const _users = userList.filter(u => u.name !== user);
      setFilteredUserList(buildNewVoteObject(_users, emojisList));
      setSelectedState(true);
      buildForm(_users);
      buildValidationSchema(_users);
    }
  }, [user]);

  const voteProps = {
    form,
    filteredUserList,
    handlePassword,
    showAlert,
    setShowAlert,
  };

  /**
   * PÁGINA.
   */
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-8 mb-8">
        <h1 className="text-5xl font-sans text-center font-semibold">
          {pageTitle}
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="row justify-center">
          {SelectUser(user, userList, handleUserSelect)}

          {selectedState ? Vote({ ...voteProps }) : null}
        </div>
      </div>
    </>
  );
}
