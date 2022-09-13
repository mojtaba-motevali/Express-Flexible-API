FROM node:14.17.0-alpine as base
RUN apk add --no-cache bash wait4ports
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

FROM base as unit-test
RUN yarn build
RUN yarn run test:unit


FROM base as int-test
ENTRYPOINT [ "STAGE=int-test", "bash", "entry-point.sh" ]



FROM base as deploy
ENTRYPOINT [ "bash", "entry-point.sh" ]