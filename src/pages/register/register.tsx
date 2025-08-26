import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi } from '../../utils/burger-api';
import { setUser } from '../../services/user/slice';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/user/action';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userDataRegistred = {
      email: email,
      name: userName,
      password: password
    };

    dispatch(registerUser(userDataRegistred));

    // registerUserApi(userDataRegistred).then((data) => {
    //   dispatch(setUser(data.user));
    // });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
