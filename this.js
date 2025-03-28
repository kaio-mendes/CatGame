class login {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}

const newUser = new login("kaio", "kaio@gmail.com", "12345678");

console.log(newUser);
