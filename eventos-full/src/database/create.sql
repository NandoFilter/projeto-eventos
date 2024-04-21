CREATE DATABASE 'sistema-eventos';

-- --------------------------------------------------------
-- Table structure for table 'EVENTOS'
-- --------------------------------------------------------
CREATE TABLE eventos
(
    id        int auto_increment
        primary key,
    nome      text     not null,
    data_hora datetime not null
);

-- --------------------------------------------------------
-- Table structure for table 'USUARIOS'
-- --------------------------------------------------------
CREATE TABLE usuarios
(
    id    int auto_increment
        primary key,
    nome  text not null,
    email text not null,
    senha text not null
);

-- --------------------------------------------------------
-- Table structure for table 'INSCRICOES'
-- --------------------------------------------------------
CREATE TABLE inscricoes
(
    id         int auto_increment
        primary key,
    id_evento  int      not null,
    id_usuario int      not null,
    data_hora  datetime not null,
    status  int not null,
    constraint inscricoes_evento_fk
        foreign key (id_evento) references eventos (id),
    constraint inscricoes_usuario_fk
        foreign key (id_usuario) references usuarios (id)
);
