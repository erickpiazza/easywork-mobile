import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

// Aqui estou usando o componente da biblioteca 'react-native-gesture-handler'
export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #0099ff;
  border-radius: 10px;
  margin-top: 16px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 18px;
`;
