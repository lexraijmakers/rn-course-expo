import { Button, SafeAreaView, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useRoute } from '@react-navigation/native'

export const ScreenWrapper = ({ navigation, children }) => {
    const route = useRoute()

    return (
        <SafeAreaView>
            <ScrollView>
                {route.name !== 'CreateUserScreen' && (
                    <Button
                        title="Go to create user"
                        onPress={() => navigation.push('CreateUserScreen')}
                    />
                )}

                {route.name !== 'UsersScreen' && (
                    <Button
                        title="Go to users"
                        onPress={() => navigation.navigate('UsersScreen')}
                    />
                )}

                {children}
            </ScrollView>
        </SafeAreaView>
    )
}
