import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import * as FirebaseService from '../services/FirebaseService';
import * as Yup from 'yup';
import SelectUser from '../components/selectUser/selectUser';
import Vote from '../components/vote/vote';
import { Emoji, User } from '../models/models';
import { useFormik } from 'formik';

export default function Home() {
  const passwordfield = {
    password: Yup.string().required('Palavra-chave é obrigratória'),
  };

  const [user, setUser] = useState<string | number>(null);
  const [selectedState, setSelectedState] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [emojisList, setEmojisList] = useState<Emoji[]>([]);
  const [validationSchema, setValidationSchema] = useState<any>(
    Yup.object().shape({
      ...passwordfield,
    }),
  );

  const pageTitle = 'Queridômetro';

  const form = useFormik({
    initialValues: null,
    onSubmit: values => {
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
      const _initialValues = { password: form?.values?.password ?? null };
      filteredUserList.forEach(user => {
        _initialValues[user.name] = null;
      });

      form.setValues(_initialValues);
    },
    [filteredUserList],
  );

  const buildValidationSchema = useCallback(
    (filteredUserList: User[]) => {
      const _validationSchema = {
        ...passwordfield,
      };

      filteredUserList.forEach(user => {
        _validationSchema[user.name] = Yup.string().required(
          'Campo obrigatório',
        );
      });

      setValidationSchema(Yup.object().shape(_validationSchema));
    },
    [filteredUserList],
  );

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

      <div className="container mx-auto px-6 md:px-0">
        <div className="row justify-center">
          {SelectUser(user, userList, handleUserSelect)}

          {selectedState ? Vote({ ...voteProps }) : null}
        </div>
      </div>
    </>
  );
}
