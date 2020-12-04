import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Container = styled.ScrollView`
  flex: 1;
  margin-left: 4px;
  margin-right: 4px;
`;

export const AvatarCoverWrapper = styled.View`
  padding-bottom: 50px;
  position: relative;
`;
export const Cover = styled.Image`
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const AvatarWrapper = styled.View`
  background-color: #000;
  position: absolute;
  border-radius: 2000px;
  left: ${(Math.round(Dimensions.get('window').width) - 10 - 140) /
  2}px; /* paddingHorizontal - avatarWidth */
  bottom: 0;
`;

export const Avatar = styled.Image`
  height: 140px;
  width: 140px;
  border-radius: 2000px;
  border-color: #fff;
  border-width: 5px;
`;

export const TextNameProvider = styled.Text`
  text-align: center;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  font-family: 'RobotoSlab-Regular';
`;
export const TextPhoneProvider = styled.Text`
  text-align: center;
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  font-family: 'RobotoSlab-Regular';
`;

export const ContainerInformations = styled.View`
  margin: 8px;
`;
export const BoxInformations = styled.View`
  background-color: #f2f2f2;

  border-bottom-width: 1px;
  border-bottom-color: #006bb3;
  border-radius: 4px;
  padding: 6px;
`;

export const Image = styled.Image`
  height: 140px;
  width: 140px;
`;
export const TitleBox = styled.Text`
  padding-left: 4px;
  color: #000000;
  font-size: 12px;
  font-weight: bold;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 8px;
`;
export const TextContent = styled.Text`
  padding-left: 4px;
  color: #000000;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 4px;
`;

export const ContainerEditImage = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 8px;
  align-content: center;
  justify-content: space-between;
`;
