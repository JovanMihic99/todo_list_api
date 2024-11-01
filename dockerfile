FROM node:18.20.4 

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

EXPOSE 5432

ENV NAME TodoList

CMD ["npm", "start"]