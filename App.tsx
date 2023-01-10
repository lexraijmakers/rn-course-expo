import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, AppRegistry, ScrollView } from 'react-native'
import { CreateUser } from './src/components/CreateUser'
import { UserList } from './src/components/UserList'

export default function App() {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={client}>
            <SafeAreaView>
                <ScrollView>
                    <CreateUser />
                    <UserList />
                </ScrollView>

                <StatusBar style="auto" />
            </SafeAreaView>
        </ApolloProvider>
    )
}

const styles = StyleSheet.create({
    container: {},
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})

AppRegistry.registerComponent('MyApplication', () => App)
