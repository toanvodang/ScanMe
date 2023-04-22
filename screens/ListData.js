import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class ListData extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginTop: 50, fontSize: 25 }}>Home!</Text>
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.Home}>Welcome to Home Screen!</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    Home: {
        fontSize: 20
    }
});