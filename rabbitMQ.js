            RABBITMQ[MESSAGE BROKER]

## 📨 3. RabbitMQ Message Broker

**Tool**: RabbitMQ  
**Use Case**: Queue weather alerts, disaster notifications, or transaction logs.

### Example (Node.js with `amqplib`):
```js
const amqp = require('amqplib');

async function sendMessage(queue, msg) {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log("Sent:", msg);
}
```

🔧 *Use this to decouple services and handle background tasks.*
