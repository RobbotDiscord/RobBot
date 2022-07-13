# syntax=docker/dockerfile:1
# With intended build context to be the pruned out dir by turborepo with --docker
FROM node:gallium AS builder

RUN npm install -g yarn

WORKDIR /app

COPY ./json ./
COPY yarn.lock ./

RUN yarn

COPY ./full ./

RUN yarn run lint && yarn run build



FROM node:gallium AS runner

RUN npm install -g yarn

WORKDIR /app

COPY ./json ./
COPY yarn.lock ./

RUN yarn

COPY --from=builder /app/**/dist .

CMD ["node", "instances/gateway/GatewayClient.js"]