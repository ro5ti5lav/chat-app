import Pusher from 'pusher';
import Sentiment from 'sentiment';

const pusher = new Pusher({
    appId: '1863325',
    key: '43a4418e55410193c240',
    secret: '9124f1f36114b22879f9',
    cluster: 'eu',
    useTLS: true,
});

const sentiment = new Sentiment();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message, username } = req.body;
        const sentimentScore = sentiment.analyze(message).score;

        await pusher.trigger('chat', 'message', {
            message,
            username,
            sentiment: sentimentScore,
        });

        res.status(200).json({ status: 'Message sent successfully' });
    } else {
        res.status(405).json({ message: 'Only POST requests allowed' });
    }
}
