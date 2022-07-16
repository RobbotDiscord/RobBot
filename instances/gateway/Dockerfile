# syntax=docker/dockerfile:1

# This will copy the whole project context, upload it to the daemon and then use yarn to install turbo and then prune away to the scoped gateway
FROM node:18-bullseye AS builder
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN yarn run prune:gateway

# Then copy the relevant lockfile and package.json(s), then proceed to imstall dependencies
FROM node:18-bullseye AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Here we'll copy all of the lockfiles, package.json(s) and the relevant node_modules folder. Then copy the rest of the code from the full output, overriding any present files
FROM node:18-bullseye AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
# COPY .gitignore .gitignore
RUN npx turbo run lint build test --scope=gateway --include-dependencies --no-deps
ENTRYPOINT [ "yarn", "run", "start:gateway" ]