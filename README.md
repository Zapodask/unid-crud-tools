# Crud de ferramentas

## Descrição

Crud de ferramentas utilizando nestjs com postgres e docker

## Tecnologias utilizadas

- Nodejs
- Typescript
- Nestjs
- Typeorm
- Graphql
- Postgres
- Docker

## Instalação

```bash
# Dentro da pasta app
$ yarn
```

## Iniciar app

```bash
# Desenvolvimento
## Windows
$ .\start.dev.ps1

## Linux
$ docker-compose up --build

### Abrir outro console
$ cd app

### Migrar tabelas
$ yarn typeorm migration:run
```

## Swagger

http://localhost:3000/swagger

## Graphql

[Playground](http://localhost:3000/graphql)

### Routes

| Tipo     | Nome       | Descrição             | Args                                                                        |
| -------- | ---------- | --------------------- | --------------------------------------------------------------------------- |
| Query    | getTools   | Listar ferramentas    | tag: string, page: number, perPage: number                                  |
| Query    | getTool    | Buscar uma ferramenta | id\*: number                                                                |
| Mutation | createTool | Criar ferramenta      | data\*: { title: string, link: string, description: string, tags: string[]} |

## License

[MIT](https://api.github.com/licenses/mit)
