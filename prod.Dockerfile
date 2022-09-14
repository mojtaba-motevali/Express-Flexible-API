FROM node:14.17.0-alpine AS prod-build
WORKDIR /app
RUN apk add bash wait4ports
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY . .
RUN yarn build
ENV STAGE=deploy
ENTRYPOINT [ "bash", "entry-point.sh" ]