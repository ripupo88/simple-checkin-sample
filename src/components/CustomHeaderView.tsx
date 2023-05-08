import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  ColorValue,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {TextElement} from './TextElement';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

type Props = {
  headerBGColor: ColorValue;
  navigation: StackNavigationProp<ParamListBase, string, undefined>;
  textPrimary: ColorValue;
  options: StackNavigationOptions;
  handleChangeTheme: () => void;
  iconName: string;
};

export const CustomHeaderView = (props: Props): JSX.Element => {
  const {
    headerBGColor,
    navigation,
    textPrimary,
    options,
    handleChangeTheme,
    iconName,
  } = props;
  return (
    <SafeAreaView>
      <View style={[styles.headerContainer, {backgroundColor: headerBGColor}]}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            testID="back-button"
            onPress={() => navigation.goBack()}>
            <Icon name={'chevron-back'} size={30} color={textPrimary} />
          </TouchableOpacity>
        )}
        <TextElement style={styles.headerText}>{options.title}</TextElement>
        <TouchableOpacity testID="theme-button" onPress={handleChangeTheme}>
          <Icon name={iconName} size={30} color={textPrimary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    color: '#ffffffcc',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
