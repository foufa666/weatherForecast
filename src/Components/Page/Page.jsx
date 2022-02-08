import React, { Fragment } from "react";
import Header from '../Header';
import styles from './Page.module.css';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast'
import useForecast from "../../hooks/useForecast";


const Page = () => {
    const {isError, isLoading, forecast, submitRequest, getMyLocationForecast } = useForecast();
    
    const onSubmit = (value) => {
        submitRequest(value);
    }

    const onSend = () =>{
        getMyLocationForecast();
    }

    return (
        <Fragment>
            <Header />
            {( !forecast && 
                <div className={`${styles.box} position-relative`}>
                    {/* Form */}
                    {!isLoading && <Form submitSearch={onSubmit} submitMyLocationSearch={onSend} />}
                    {/* Error*/}
                    {isError && <Error message={isError}/>}
                    {/* Loader*/}
                {isLoading && <Loader />}
                    
                </div>
                )}
            {/* Forecast*/}
            {forecast && <Forecast forecast={forecast} />}
            
        </Fragment>
        
    )
}

export default Page;