# Locadora de veículos

## Requisitos
- Cada veículo só pode estar locado para um cliente por vez
- Deve haver um intervalo de um dia entre a entrega e a próxima locação
- O preço varia de acordo com feriado e final de semana e o responsável pode mudar esse valor
- Pode renovar a locação por até 3 vezes, no passando o limite de 30 dias
- A cobrança é antecipada
- Multa por atraso mais a multa por dia atrasado
- Deve haver a possibilidade de agendamento prévio para a locação do carro
- Para locar o carro precisa fazer o login

---

## O que pode ser feito
- Escolher data de retirada
- Escolher data de entrega
- Escolher um dos carros do destaque
- Escolher um dos carros mais baratos
- Ver todos os carros disponíveis
- Fazer login
- Locar o carro só depois do login feito
- Estender o aluguel
- Ver os carros que você alugou
- Agendar um carro com antecedência

---

## O que não poderá ser feito
- Escolher a hora de retirada e a hora de entrega
- Escolher o local de retirada e o local de entrega
- Escolher a cor do carro
- Escolher a quantidade de carros
- Escolher um carro que já está alugado ou em limpeza

---

## Endpoints

### GET - Home

#### Dados enviados
- offset

#### Dados retornados
- Header
    - Logo
    - Login
    - Carros alugados
    
- Calendário de agendamento
    - Data de retirada
    - Data de devolução
    - Retornar os carros disponíveis nessa data
    
- Section dos carros destaques
    - Id do carro
    - Imagem
    - Nome
    - Detalhes a respeito do carro
    - Valor do aluguel do carro
    - Botão de alugar
    
- Carrosel dos carros mais baratos
    - Id do carro
    - Imagem
    - Nome
    - Detalhes a respeito do carro
    - Valor do aluguel do carro
    - Botão de alugar

- Botão para ver toda a Frota

- Footer
    - O nome da locadora com o 'c' comercial
    - Localização da locadora
    - Email
    - Telefone
    - Instagram da locadora

### Objetivos gerais

- Mostrar a home do site

---

### GET - Reservas

#### Dados enviados
- Token

#### Dados retornados
- Os carros alugados por mim []
    - Data para entrega
        - Se tiver passado da data, ela ficará vermelha
    - Informações a respeito do veículo

### Objetivos gerais

- Validar o token
- Buscar os carros alugados de acordo com o id do token
- Retornar os carros alugados

---

### POST - Login

#### Dados enviados

- Email
- Senha

#### Dados retornados 

- Sucesso ou erro
- Token

### Objetivos gerais

- Validar o email e a senha
- Buscar o usuario no banco de dados
- Verificar se a senha informada está correta
- Gerar o token de autenticação
- Retornar os dados do usuário e o token

---

### POST - Cadastro

#### Dados enviados

- Nome
- Email
- Telefone
- Data de nascimento
- CPF
- Endereço
- Cartão de crédito
    - Número
    - Validade
    - Código de verificação
- Senha


#### Dados retornados

- Sucesso ou erro

### Objetivos gerais

- Verificar se existe outro usuário com o mesmo email
- Verificar se existe outro usuário com o mesmo CPF
- A senha deve ter no mínimo 8 caracteres
- Criptografar a senha e os códigos do cartão de crédito
- Retornar sucesso ou erro

---

### PUT - Alugar 

#### Dados enviados

- Token
- Id do carro
- Período em que ele será alugado


#### Dados retornados

- Sucesso ou erro
- O nome do locatário, o modelo, a placa do veículo, o tempo de aluguel e o valor final 

### Objetivos gerais

- Validar o token
- Verificar se o carro está disponível para aquela data
    - Se ele já está alugado
    - Se está no período de limpeza
- Informar o valor total do aluguel e que o pagamento já foi aprovado no cartão, retornando os últimos 4 digitos do cartão dele

---

### PUT - Renovar aluguel 

#### Dados enviados

- Token
- Id do carro
- Período em que ele será alugado

#### Dados retornados

- Sucesso ou erro
- O nome do locatário, o modelo, a placa do veículo, o tempo de aluguel e o valor final 

### Objetivos gerais

- Validar o token
- Verificar se o carro já teve o aluguel renovado pelo usuário 3 vezes e se o período a ser locado não ultrapassa os 30 dias
- Informar o valor total do aluguel e que o pagamento já foi aprovado no cartão, retornando os últimos 4 digitos do cartão dele
 
---

### PUT - Alterar valor do aluguel 

#### Dados enviados

- Token
- Id do carro
- Valor
- Período em que o aluguel terá o novo valor


#### Dados retornados

- Sucesso ou erro 

### Objetivos gerais

- Validar o id específico do administrador
- Buscar o veículo
- Alterar o valor do aluguel no período especificado

---

### PUT - Carro entregue 

#### Dados enviados

- Token
- Id do carro


#### Dados retornados

- Verificar se entregou no prazo
    - Aplicar multa em caso de atraso
- Sucesso ou erro 

### Objetivos gerais

- Validar o id específico do administrador
- Buscar o veículo
- Verificar se o carro foi entregue no prazo
- Aplicar a multa geral e a multa diária
- Informar a data de entrega do veículo