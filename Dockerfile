FROM node:lts-alpine3.20

RUN apk add --no-cache postgresql-client

WORKDIR /src

COPY . .

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run dev --host 0.0.0.0; fi"]