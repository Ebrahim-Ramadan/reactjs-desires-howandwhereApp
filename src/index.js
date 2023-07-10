import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './bootstrap.min.css';
import './normalize.css';
import './index.css';
import './logo.css';
import './components/logo'
import 'bootstrap/dist/css/bootstrap.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { AuthProvider } from "react-auth-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// Import the necessary dependencies
// import { library } from '@fortawesome/fontawesome-free';
// import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';

// import '@fortawesome/fontawesome-free/css/all.css';

// // Add the imported icons to the library
// library.add(faFontAwesome)



ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
<AuthProvider>
                <BrowserRouter
                    authType={'cookie'}
                    authName={'_auth'}
                    cookieDomain={window.location.hostname}
                cookieSecure>
            <App />
                </BrowserRouter>
                </AuthProvider>
        </Provider>

    </React.StrictMode>,
    document.getElementById('rot')
);
// reportWebVitals();   