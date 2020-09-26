const express = require('express')
const app = express()

app.use(express.json())

let claims = [
  {
    id: 1,
    open_date: "2020-04-01",
    category: "Claim",
    description_internally: "Empfänger meldet Nichterhalt",
    deadline: "2020-04-03",
    status: "wieder geöffnet",
    shipment: {
      id: 123456,
      reference_code: "ABCDE-12345"
    }
  },
  {
    id: 2,
    open_date: "2020-05-01",
    category: "Claim",
    description_internally: "Nachbar nicht bekannt",
    deadline: "2020-05-03",
    status: "geschlossen",
    shipment: {
      id: 123457,
      reference_code: "12345-ABCDE"
    }
  },
  {
    id: 3,
    open_date: "2020-06-01",
    category: "Claim",
    description_internally: "Pünktlich liefern",
    deadline: "2020-06-02",
    status: "geschlossen",
    shipment: {
      id: 123458,
      reference_code: "54321-AMBCN"
    }
  }
]

const generateNewId = () => {
  const maxId = claims.length > 0 ? Math.max(...claims.map(n => n.id)) : 0
  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/claims', (req, res) => {
  res.json(claims)
})

app.post('api/claims', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({error: 'content missing'})
  }

  const newClaim = {
    id: generateNewId(),
    open_date: new Date(),
    category: body.category,
    description_internally: body.description_internally,
    deadline: body.deadline,
    status: "geöffnet",
    shipment: {
      id: body.shipment-id,
      reference_code: body.shipment-reference_code
    }
  }

  claims = claims.concat(newClaim)
  res.json(newClaim)
})

app.get('/api/claims/:id', (req, res) => {
  const id = Number(req.params.id)
  const claim = claims.find(claim => claim.id === id)
  if(note) {
    res.json(claim)
  } else {
    res.status(404).end
  }
})

app.delete('/api/claims/:id', (req, res) => {
  const id = Number(req.params.id)
  claims = claims.filter(claim => claim.id !== id)
  res.status(204).end
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
})