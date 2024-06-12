const express = require('express')
var cors = require('cors')
const app = express()
const { ContainerListModel, TransactionsModel } = require('./schemas.js')
const connectDatabase = require('./database.js')

connectDatabase

app.use(cors())
app.use(express.json());

app.get('/containers', async (req, res) => {
    try {
        const response = await ContainerListModel.find({});
        res.status(200).json({ response })
    } catch (error) {
        res.status(500).json({ message: "Unexpected error!" })
    }
})

app.post('/containers', async (req, res) => {
    const { pledgedTime, containerId, owner, receiver, price, containerStatus } = req.body || {}
    try {
        await ContainerListModel.create({
            pledgedTime: pledgedTime,
            containerId: containerId,
            owner: owner,
            receiver: receiver,
            price: price,
            containerStatus: containerStatus,
        });
        res.status(200).json({ message: "Container added into ledger" })
    } catch (error) {
        res.status(500).json({ message: "Unexpected error!" })
    }
})

app.put('/containers/:id', async (req, res) => {
    console.log("type",req.body)
    console.log(req.params.id)
    let body = {}
    if(req.body.unpledgedTime){
        body = {
            unpledgedTime: req.body.unpledgedTime,
            containerStatus: req.body.containerStatus
        }
    }
    else{
        body = {
            containerStatus: req.body.containerStatus
        }
    }
    try {
        const a = await ContainerListModel.findOneAndUpdate({ containerId: req.params.id }, body )
        console.log("a", a)
        res.status(200).json({message: "Data updated"})
    } catch (error) {
        res.status(400).json({message: "Unexpected error!"})
        console.error("e", error)
    }
})

app.post('/transactions', async (req, res) => {
    const { unpledgedTime, containerId, owner, receiver, price, containerStatus } = req

    try {
        await TransactionsModel.create({
            unpledgedTime: convertTime(unpledgedTime),
            containerId,
            owner,
            receiver,
            price,
            containerStatus
        })
        res.status(200).json({ message: "Transaction added into ledger" })
    } catch {
        res.status(500).json({ message: "Unexpected error!" })
    }
})

app.post('unpledgedContainers')

app.listen(5000, () => {
    console.log(`port 5000 is ready`);
});