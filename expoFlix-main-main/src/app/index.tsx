import { InputComponent } from "../components/inputComponent";
import { useRouter, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const validarEmail = "123@gmail.com";
  const validarPassword = "123456";

  const router = useRouter();

  //FAZER A LÓGICA PARA NAVEGAR PARA O DASHBOARD
  const handlerLogin = () => {
  if(!email || !password){
        setError("Preencha todos os campos.");
        setIsError(true);
      return;
        }
        if(!email.includes("@")){
            setError("Insira um email válido");
            setIsError(true);
            return;
        }

        if(password.length < 6){
            setError("A senha deve conter pelo menos 6 caractres");
            setIsError(true);
            return
        }

        if(email === validarEmail && password === validarPassword){
            setError(null);
            //router.push("/dashboard");
            router.replace("/(tabs)/dashboard" as Href);
        }else{
            setError("Email ou senha incorreta");
            setIsError(true);
        }
    
  };
  

  //NOTE QUE TEMOS UMA TAG CHAMADA 'InputComponent'. ESSE COMPONENTE ESTA NA PASTA COMPONENTE.
  //VÁ ATÉ A PASTA COMPONENTE E COMPLETE O CÓDIGO DO ARQUIVO PARA QUE FUNCIONE.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExpoFlix</Text>
      <InputComponent
        label="Email"
        placeholder="Digite o Email"
        type="email-address"
        value={email}
        setValue={setEmail}
      />
      <InputComponent
        label="Senha"
        placeholder="Digite a Senha"
        type="default"
        value={password}
        setValue={setPassword}
        
      />
      {isError && <Text style={styles.errorMessage}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handlerLogin}>
        <Text style={styles.buttonTitle}>Entrar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#19244B",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "white",
    width: 300,
    height: 40,
    padding: 4,
    borderWidth: 1,
    borderColor: "#6B76A0",
    borderRadius: 8,
  },
  errorMessage: {
    alignSelf: "center",
    color: "#F5482F",
  },
  button: {
    backgroundColor: "#86A16C",
    width: 300,
    height: 40,
    marginTop: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
});
