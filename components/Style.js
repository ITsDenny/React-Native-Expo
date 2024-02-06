import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    padding: 8,
    width: "80%",
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 8,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  loginButton: {
    borderRadius: 10,
    width: 100,
    padding: 8,
    alignItems: "center",
    backgroundColor: "#3887BE",
    color: "#fff",
  },

  registerButton: {
    borderRadius: 10,
    width: 100,
    padding: 8,
    alignItems: "center",
    backgroundColor: "#65B741",
    color: "#fff",
  },

  buttonText: {
    color: '#fff'
  }
});
