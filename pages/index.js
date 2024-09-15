import { useEffect, useState } from 'react';
import pusher from '../lib/pusher';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const channel = pusher.subscribe('chat');
        channel.bind('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const sendMessage = async () => {
        if (message && username) {
            await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, username }),
            });
            setMessage('');
        }
    };

    // Обработка нажатия клавиши
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Предотвращаем стандартное поведение Enter (перенос строки)
            sendMessage();
        }
    };

    return (
        <div className="container mt-4">
            <Header />
            <div className="row">
                {/* Левая колонка: Форма для ввода имени пользователя и сообщения */}
                <div className="col-md-4">
                    <div className="card chat-card p-4">
                        <div className="card-body">
                            <h4 className="chat-title">Chat Input</h4>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control message-input"
                                    placeholder="Enter your name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control message-input"
                                    placeholder="Enter your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown} // Обработчик для клавиши Enter
                                />
                            </div>

                            <button className="btn btn-primary w-100" onClick={sendMessage}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* Правая колонка: Окно чата с сообщениями */}
                <div className="col-md-8">
                    <div className="card chat-window p-4">
                        <div className="card-body">
                            <h4 className="chat-title">Messages</h4>

                            <div className="message-list">
                                <ul className="list-group">
                                    {/* Отображаем последние сообщения сверху */}
                                    {messages.slice().reverse().map((msg, index) => (
                                        <li className="list-group-item message-item" key={index}>
                                            <strong>{msg.username}: </strong>
                                            {msg.message}
                                            <span
                                                className={`badge float-end ${msg.sentiment >= 0 ? 'positive-badge' : 'negative-badge'
                                                    }`}
                                            >
                                                {msg.sentiment >= 0 ? 'Positive' : 'Negative'}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
