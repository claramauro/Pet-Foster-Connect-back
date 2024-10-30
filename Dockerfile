FROM node:lts-alpine3.20

RUN apk add --no-cache postgresql-client

WORKDIR /src

COPY . .

CMD ["sh", "-c", "npm install && npm run dev --host 0.0.0.0"]