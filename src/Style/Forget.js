import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64748b",
    // ...StyleSheet.absoluteFillObject,
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    // width: "30%", // Adjust the width as needed
    aspectRatio: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  accountContainer: {
    marginHorizontal: 19,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "#fff",
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#71717a",
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 20,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "white",
  },
  horizontalLineText: {
    color: "white",
    paddingHorizontal: 10, // Adjust padding as needed
    fontSize: 18, // Adjust font size as needed
  },
  dontHaveAnAccount: {
    marginHorizontal: 19,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  forget: {
    marginHorizontal: 19,

    flexDirection: "row", // Change to 'row' or 'row-reverse'
    alignItems: "center",
    justifyContent: "flex-end", // Aligns the child to the end
    padding: 10,
  },
  welcome: {
    // fontFamily: "Helvetica",
    fontWeight: "normal",
    marginVertical: 15,
    color: "white",
    fontSize: 18,
  },
  login: {
    // fontFamily: "Helvetica",
    fontWeight: "900",
    fontSize: 30,
    color: "white",
  },
  inputText: {
    width: "90%",

    backgroundColor: "#fff",
    color: "#000",
    flexDirection: "row",
  },
  ViewinputText: {
    height: 45,
    // borderColor: "gray",
    // borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    color: "#000",
    flexDirection: "row",
  },
  buttonContainer: {
    width: "97%",
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 6,
  },
  SignUpbutton: {
    color: "#22c55e",
    fontSize: 17,
    textAlign: "center",
    marginHorizontal: 6,
  },
});
