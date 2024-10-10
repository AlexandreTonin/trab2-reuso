import express from 'express'
import { validateToken } from './validateToken.js'

const app = express()

app.get('/traffic', validateToken, (req, res) => {
  res.status(200).json({
    estradas: [
      { nome: 'Rodovia dos cronomantes', km: 47, sentido: 'Reino dos cronomantes', transito: 'moderado', condicoes: 'boas' },
      { nome: 'Rodovia dos guerreiros', km: 10, sentido: 'Reino dos guerreiros', transito: 'intenso', condicoes: 'buracos' },
      { nome: 'Rodovia dos guardioes', km: 102, sentido: 'Reino dos guardioes', transito: 'congestionado', condicoes: 'mediana' },      { nome: 'Rodovia dos cronomantes', km: 47, sentido: 'Reino dos cronomantes', transito: 'moderado', condicoes: 'boa' },
    ]
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})