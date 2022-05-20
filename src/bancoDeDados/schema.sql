create database locadora_veiculos;

drop table if exists veiculos;

drop table if exists usuarios;

drop table if exists cartao_credito;

drop table if exists reservas;

create table veiculos (
  id serial primary key,
  nome text not null,
  imagem text not null,
  detalhes text,
  valor_aluguel_diaria int not null,
  placa text not null
);

create table usuarios (
  id serial primary key,
  nome text not null,
  email text unique not null,
  telefone text not null,
  data_de_nascimento timestamptz,
  data_cadastro timestamptz default now(),
  cpf text unique not null,
  endereco text not null,
  senha text not null
);

create table cartao_credito (
	id serial primary key,
  numero_cartao_credito text not null,
  validade text not null,
  codigo_verificacao text not null,
  usuario_id int not null,
  foreign key (usuario_id) references usuarios (id) 
);

create table reservas (
	id serial primary key,
  veiculo_id int not null,
  usuario_id int not null,
  data_locacao timestamptz not null,
  data_devolucao timestamptz not null,
  valor_total int not null,
  quantidade_renovacao_aluguel int,
  foreign key (veiculo_id) references veiculos (id),
  foreign key (usuario_id) references usuarios (id) 
);