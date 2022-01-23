FROM node:16.13.2-alpine

WORKDIR /usr/app

COPY package.json yarn.lock tsconfig.json tsconfig.build.json schema.gql ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "start:dev"]
