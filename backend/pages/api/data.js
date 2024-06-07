const data = [

]

export default async function handler(req,res) {
    if (req.method === 'GET') {
        res.status(200).json(data)
    } else if (req.method === 'POST') {
        const bodyData = await req.query;
        const newData = {
            weight: bodyData.weight,
            birthdate: bodyData.birthdate,
            email: bodyData.email
        }
        data.push(newData);
        res.status(201).json(newData)
    }
}