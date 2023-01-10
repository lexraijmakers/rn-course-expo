import { useState } from 'react'
import { TextInput, View, StyleSheet, Button } from 'react-native'
import { useSignupUserMutation } from '../../gql/mutations/SignupUser.generated'

export const CreateUser: React.FC = () => {
    const [signupUser] = useSignupUserMutation({ refetchQueries: ['AllUsers'] })

    const [name, setName] = useState<string | null>(null)
    const [age, setAge] = useState<string | null>(null)

    const handleSubmit = () => {
        signupUser({ variables: { data: { name, age: parseInt(age) } } }).then((res) => {
            setAge(null)
            setName(null)
        })
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Your name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setAge}
                value={age}
                placeholder="Your age"
                keyboardType="numeric"
            />
            <Button title="submit" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})
