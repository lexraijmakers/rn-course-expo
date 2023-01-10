import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppRegistry } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { CreateUserScreen } from './src/screens/CreateUserScreen'
import { UsersScreen } from './src/screens/UsersScreen'
import { MoviesScreen } from './src/screens/MoviesScreen'

export default function App() {
    const Stack = createNativeStackNavigator()
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache()
    })

    return (
        <NavigationContainer>
            <ApolloProvider client={client}>
                <Stack.Navigator>
                    <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
                    <Stack.Screen name="UsersScreen" component={UsersScreen} />
                    <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
                </Stack.Navigator>
            </ApolloProvider>
        </NavigationContainer>
    )
}

AppRegistry.registerComponent('MyApplication', () => App)
