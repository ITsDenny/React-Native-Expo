import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginForm from "./components/screen/Login";
import Home from "./components/screen/Home";
import Register from "./components/screen/Register";
import StudentHome from "./components/screen/student/StudentHome";
import LibrarianHome from "./components/screen/librarian/LibrarianHome";
import BookList from "./components/screen/student/BookList";
import LoanRequest from "./components/screen/student/LoanRequest";
import AcceptLoan from "./components/screen/librarian/AcceptLoan";

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={Register} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StudentHome" component={StudentHome} options={{ title: 'Student Home', headerLeft: () => null }} />
        <Stack.Screen name="BookList" component={BookList} options={{ title: 'Book List' }} />
        <Stack.Screen name="LoanRequest" component={LoanRequest} options={{ title: 'Loan Request' }} />
        <Stack.Screen name="AcceptLoan" component={AcceptLoan} options={{ title: 'Accept Loan' }} />
        <Stack.Screen name="LibrarianHome" component={LibrarianHome} options={{ title: 'Librarian Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App