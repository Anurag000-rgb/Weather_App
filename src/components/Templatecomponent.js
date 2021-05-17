import styled from 'styled-components';
import { useState, useEffect } from 'react';


const Tempapp = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("delhi");

    useEffect(() => {
        const fetchApi = async() => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=2f13e72b5d5408da76ad8cd5a3a87d0e`
            const res = await fetch(url);
            const data = await res.json();
            setCity(data.main);
        }
        fetchApi()
    },[search] )

    const temp_ = () => {
        let x;
        if(city.temp >= 36) {
            x = <p>🌇</p>
        } else {
            x = <p>🏙️</p>
        }
        return x;
    }

    return(
        <Container>
            <Box> 
                    <div className="inputData">
                        <input
                        type='search'
                        value={search}
                        className='inputField'
                        onChange = { (event) => {
                            setSearch(event.target.value)
                        } }
                        />
                    </div>

            {!city ? (
                <p className='errormsg'>No Data Found</p>
            ) : (
                <Info>
                    <h2 className='location'>
                    {temp_()}
                    {search}
                    </h2>
                    <h1 className='temp'>
                        {city.temp}°C
                    </h1>
                    <h3 className='tempmin_max'> Min : {city.temp_min}°C 😰 | max : {city.temp_max}°C 🥵</h3>

                    <div className='wave -one'></div>
                    <div className='wave -two'></div>
                    <div className='wave -three'></div>
                </Info>
            )

            }

                   
            </Box>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const Box = styled.div`
    width: 25vw;
    height: 60vh;
    border-radius: 0.5rem;
    box-shadow: 0 0.2rem 3rem rgba(0, 0, 0, 0.2);
    background: #a5bbdd;
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    min-width: 20rem;
    min-height: 35rem;

    .inputData {
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inputField {
        width: 60%;
        margin: auto;
        border-radius: 5rem;
        outline: none;
        padding: 0.5rem 0.5rem;
        font-size: 1.5rem;
    }

    .errormsg {
        text-align: center;
        font-size: 2rem;
        margin: 2rem auto;
    }

    &:after {
        content: "";
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 11;
        transform: translate3d(0, 0, 0);
    }


    @media (max-width: 600px) {
        width: 90vw;
        height: 80vh;
    }

    @media (max-width: 500px) {
        height: 80vh;
    }
`;

const Info = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 60vh;
    z-index: 4;

    .location {
        margin-top: 1.5rem;
        text-align: center;
        font-weight: 800;
        font-size: 5rem;
        text-transform: capitalize;
    }

    .wave {
        opacity: 0.3;
        position: absolute;
        top: 120%;
        left: 50%;
        background: #fff;
        width: 50rem;
        height: 50rem;
        margin-left: -25rem;
        margin-top: -20rem;
        transform-origin: 50% 48%;
        border-radius: 43%;
        animation: drift 3000ms infinite linear;
        z-index: 1;
    }

    .wave.-three {
        animation: drift 7000ms infinite linear;
        z-index: 2 !important;
        opacity: 0.2;
    }

    .wave.-two {
        animation: drift 7000ms infinite linear;
        opacity: 0.1;
        z-index: 3 !important;
    }


    @keyframes rotates {
        from {
            transform: translateX(-0.5rem);
        }
        from {
            transform: translateX(0.5rem);
        }
    }


    @keyframes drift {
        from {
            transform: rotate(0deg);
        }
        from {
            transform: rotate(360deg);
        }
    }

    .temp {
        margin-top: 1.5rem;
        text-align: center;
        font-size: 3rem;
    }

    .tempmin_max {
        text-align: center;
        margin-top: 0.3rem;
        font-weight: 300;
        font-size: 1.2rem;
        color: #57606f;
    }

    @media (max-width: 600px) {
        font-size: 1.5em;
    }

`;

export default Tempapp;