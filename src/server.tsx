import express, { Request, Response } from 'express'
import { renderToString } from 'react-dom/server'
import path from 'path'
import App from './App'
import template from './template'
import fetch from 'isomorphic-fetch';

const app = express()

app.use(express.static(path.resolve(__dirname, './dist/public')))

// @ts-expect-error
app.get('/', (req: Request, res: Response) => {
  fetch('https://api.github.com/users/gaearon/gists')
    .then(response => response.json())
    .then(gists => {
      const body = renderToString(<App gists={gists}/>)
      const html = template(body);
      res.send(html);
    })
})

app.listen(3000, () => console.log('Listening on port 3000'))