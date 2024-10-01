FROM node:18

WORKDIR /usr/src/app

RUN npm install --verbose

# -d will check if exists and then does run dev or install and run dev
CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev
