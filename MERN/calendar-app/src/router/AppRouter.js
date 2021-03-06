import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    // Extraemos info del store gracias a redux
    const { checking , uid } = useSelector(state => state.auth);

    // Cada vez que accedemos a cualquier archivo
    useEffect(() => {
        dispatch( startChecking() )
    }, [dispatch]);

    // Si el checking no esta en false
    if ( checking ) {
        return (<h5>Espere....</h5>);
    }

    // Convertir un string en boleano añadiendo !!
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen }
                        isAuthenticated={ !!uid } 
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
