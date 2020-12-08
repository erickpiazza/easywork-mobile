import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Container = styled.View`
  padding-top: 4px;
  padding-right: 8px;
  padding-left: 8px;
`;

export const Image = styled.Image`
  height: 140px;
  width: 100%;
`;

export const ContainerListProvider = styled.View`
  background-color: #ffffff;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  flex-direction: row;
`;

export const ContainerInformationProvider = styled.View`
  width: 70%;
  margin-left: 8px;
`;

export const InformationProvider = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Regular';
  font-weight: bold;
  font-size: 18px;
  margin-top: 4px;
`;

export const AvatarCoverWrapper = styled.View`
  position: relative;
  top: 0px;
`;

export const Cover = styled.Image`
  width: 100%;
  height: 158px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const AvatarWrapper = styled.View`
  background-color: #000;
  position: absolute;
  border-radius: 2000px;
  left: ${(Math.round(Dimensions.get('window').width) - 10 - 140) /
  2}px; /* paddingHorizontal - avatarWidth */
  bottom: 40px;
`;

export const Avatar = styled.Image`
  height: 140px;
  width: 140px;
  border-radius: 2000px;
  border-color: #fff;
  border-width: 5px;
`;
