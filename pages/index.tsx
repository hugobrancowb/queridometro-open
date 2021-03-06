import 'bootstrap/dist/css/bootstrap.min.css';
import style from './index-style.module.css'
import Head from 'next/head'
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import * as FirebaseService from '../services/FirebaseService'

export default function Home() {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  
  /**
   * Função chamada ao carregar a página.
   */
  const onRender = (): void => {
    FirebaseService.GETMockData().then(array => {
      setUserList(array);
    })
  };
  useEffect(onRender, []);
  
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
          
          <p className="description">
            Nessa tela o usuário irá se identificar.
          </p>
          
          <div className={ style.userSelect }>
            <Form>
              <Form.Group className={ style.formGroup } controlId='selectUser'>
                <Form.Label>Quem é você?</Form.Label>
                <Form.Control as='select' value={-1} onChange={() => {}} >
                  <option disabled value={-1} key={-1}>Busque seu nome</option>
                  {
                    userList.map((user, index) =>
                      <option disabled value={ user } key={ user }>
                        { user }
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
