import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";
import React from 'react';


export const ButtonText: React.FunctionComponent<ButtonTextProps> = ({ text }) => (
    <TouchableOpacity >
      <Text style={ styles.title }>
            {text}
        </Text>
    </TouchableOpacity>
);

// export const ButtonTextHeader: React.FunctionComponent<ButtonTextProps> = ({ text }) => (
//     <TouchableOpacity >
//       <Text style={ styles.header }>
//             {text}
//         </Text>
//     </TouchableOpacity>
// );

export interface ButtonTextProps extends TouchableOpacityProps {
    text: string;
}

const styles = StyleSheet.create({
    title: {
      fontSize: 14,
      fontWeight: '200',
      color:'black',
      paddingLeft: 5
    },
    header: {
        fontSize: 14,
        fontWeight: '200',
        color:'black',
        backgroundColor: 'white',
        paddingLeft: 5
      },

});