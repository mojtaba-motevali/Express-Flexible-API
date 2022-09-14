FROM node:14.17.0-alpine AS test-base
WORKDIR /app
RUN apk add bash wait4ports
COPY package.json .
COPY yarn.lock .
ENV STAGE=test
RUN yarn install
COPY . .
ENTRYPOINT [ "bash", "entry-point.sh" ]

