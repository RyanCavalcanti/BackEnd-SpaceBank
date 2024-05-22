# SpaceBank 💰

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 📌 Sobre
O **SpackeBank** é uma simulação de um banco digital, desenvolvido para que o usuário possa se cadastrar e fazer login normalmente para ter acesso ao dashboard principal onde ele terá acesso às transações de depósitos e transferências com integração a um banco de dados que salva as informações de saldo e extratos das transações e retorna sempre que o usuário faz login na página.

### NodeJS:
- Projeto desenvolvido usando NodeJS com Typescript para a melhor qualidade e segurança do Backend.
#### Dependências usadas no NodeJS:
* Express (Framework web para Node.js que simplifica o processo de criação de APIs RESTful e aplicativos web, oferecendo uma ampla gama de recursos para lidar com solicitações HTTP.)
* Nodemon (Utilizado durante o desenvolvimento para monitorar alterações nos arquivos do projeto e reiniciar automaticamente o servidor, garantindo uma experiência de desenvolvimento mais fluida.)
* Bcrypt (Uma biblioteca de hashing de senha usada para criptografar senhas de usuários, tornando-as mais seguras e protegendo contra ataques de força bruta.)
* Cors (Middleware que permite a configuração de políticas de segurança de acesso aos recursos de um servidor web, controlando quais origens têm permissão para acessar os recursos.)
* Dotenv (Utilizado para carregar variáveis de ambiente a partir de um arquivo .env, facilitando a configuração de valores sensíveis, como chaves de API ou credenciais de banco de dados.)
* JWT (Biblioteca para Node.js que permite a autenticação baseada em token, gerando e verificando tokens JWT (JSON Web Tokens) para autenticar usuários em aplicativos web e APIs.)
* Mysql12 (Driver MySQL para Node.js, que facilita a interação com um banco de dados MySQL a partir do código Node.js, permitindo executar consultas e manipular dados de forma eficiente.)

---


### React:
- Projeto desenvolvido usando ReactJS + Vite com Typescript para a melhor qualidade e segurança do Frontend.
#### Dependências usadas no React:
* react-axios (Esta dependência é utilizada para fazer requisições HTTP no frontend, facilitando a comunicação com o backend e obtenção de dados dinâmicos.)
* styled-components (Permite a criação de componentes estilizados no React, possibilitando a definição de estilos de forma mais modular e organizada.)
* eslint (Ferramenta de linting que ajuda a manter um código JavaScript/TypeScript limpo e consistente, identificando possíveis erros e padrões de código não conformes.)
* fortawesome (Biblioteca de ícones que oferece uma vasta gama de ícones vetoriais que podem ser facilmente incorporados em projetos React.)
* Página do Front-End: <a href="https://github.com/RyanCavalcanti/Space-Bank">SpaceBank</a>


### MySQL:
<p>O MySQL é responsável por armazenar as informações da conta de cadastro do usuário, saldo, valores de transferências/depósitos e um id para cada transação</p>
#### Tabela de Usuários:
<Table>
  <tr>
    <td>id</td>
    <td>firstName</td>
    <td>lastName</td>
    <td>email</td>
    <td>password</td>
    <td>saldo</td>
  </tr>
</Table>
#### Tabela de Transações:
<Table>
  <tr>
    <td>id</td>
    <td>userId</td>
    <td>transactionId</td>
    <td>data</td>
    <td>mes</td>
    <td>tipo</td>
    <td>valor</td>
  </tr>
</Table>
<p>O userId vem da tabela de Usuários para linkar quem fez a transação pelo ID</p>


## Funcionalidades Principais:
* **Criação de Conta:** Os usuários podem criar facilmente suas contas bancárias digitais, fornecendo informações básicas de cadastro.
* **Login Seguro:** Após a criação da conta, os usuários podem fazer login de forma segura com autenticação, garantindo a privacidade e segurança de suas informações.
* **Depósitos e Transferências:** Os clientes podem realizar depósitos em suas contas e transferências dentro do sistema, proporcionando uma experiência completa de transações financeiras.
* **Acesso a Extratos:** Além disso, os usuários têm acesso aos extratos de suas transações, permitindo-lhes acompanhar seus históricos financeiros de forma transparente.

<p>O SpaceBank é apenas um sistema de criação pessoal para portfólio. Podem usar normalmente como fonte de estudos :)</p>
<p>Se for baixar o projeto, altere as imagens e informações!</p>
