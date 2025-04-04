import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {StatusBarProps} from 'react-native';

export interface FocusAwareStatusBarProps extends StatusBarProps {}
const FocusAwareStatusBar: React.FC<FocusAwareStatusBarProps> = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};
export default FocusAwareStatusBar;
