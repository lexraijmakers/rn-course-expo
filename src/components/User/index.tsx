import { Text, View, StyleSheet, Button, GestureResponderEvent } from 'react-native'
import { User as UserType } from '../../gql/graphql'

export interface UserProps extends UserType {
    handleDelete: (id: number) => void
}

export const User: React.FC<UserProps> = ({ name, age, id, handleDelete }) => {
    return (
        <View style={styles.card}>
            <Text>name: {name}</Text>
            <Text>age: {age}</Text>
            <Button title="delete" onPress={() => handleDelete(id)} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        height: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})
