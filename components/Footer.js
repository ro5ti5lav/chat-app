import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white text-center py-3">
            <p>&copy; {currentYear} MyChat. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
