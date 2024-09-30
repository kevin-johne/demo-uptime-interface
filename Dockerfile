FROM node:18

WORKDIR /usr/src/app

COPY ./app .

RUN npm install

CMD ["npm", "run", "dev"] 
