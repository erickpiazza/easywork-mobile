import React from 'react';
import {Text, View, Button} from 'react-native';
import {useAuth} from '../../hooks/auth';

const Home: React.FC = () => {
  const {signOut} = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Button title="sair" onPress={signOut} />
    </View>
  );
};

export default Home;
