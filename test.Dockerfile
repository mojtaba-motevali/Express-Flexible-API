FROM node:14.17.0-alpine AS test-build
WORKDIR /app
RUN apk add bash wait4ports
COPY package.json .
COPY yarn.lock .
ENV STAGE=integrationTest
RUN yarn install
COPY . .
ENTRYPOINT [ "bash", "entry-point.sh" ]

