import React from 'react'
import { Text, View } from 'react-native'

const MainLayout = (props) => {
    const { title } = props;
    return (
        <View>
            <Text style={styles.textTitle}>{title}</Text>
            <View>{props.children} </View>
        </View>
    )
}

export default MainLayout