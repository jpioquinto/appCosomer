import {useState, ChangeEvent, FormEvent} from 'react'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import { useAuthStore } from '../store/auth'
import { useLoadingStore } from '../store/loading'
import Loading from './Loading'
import 'react-toastify/dist/ReactToastify.css'
import './../../css/app/plugins.min.css'
import './../../css/app/kaiadmin.min.css'
import logoDesarrollo from './../../../public/assets/images/logos/desarrollo_territorial.png'

type FormProps = {
    nickname:string,
    password:string,
    rememberme:boolean
}

const initialState : FormProps = {
    nickname:'', 
    password:'', 
    rememberme:false
}

export default function Login() {

    const [credenciales, setCredenciales] = useState(initialState)

    const {setIsLoading, loadShow, loadHidden} = useLoadingStore()

    const {setUser, setToken, setContact, setAuthenticated} = useAuthStore()

    const navigate = useNavigate();

    const handleErrorsLogin = error => {
        loadHidden();
        toast.error(error.response.data.message, {
            position:"bottom-right",
            theme:"colored"
        })
    };

    const handleSuccessLogin = response => {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ response.data.token;
        setToken(response.data.token);
        setUser(response.data.user);
        setContact(response.data.contact)
        setAuthenticated(true);
        loadHidden();
        
        toast.success(`Bienvenido ${response.data.user.username}`, {
            position:"bottom-right",
            theme:"colored"
        });
        /*localStorage.setItem('access_token', response.data.access_token);
        config.asignarToken({token:response.data.access_token, nickname: response.data.user.nickname, acciones:response.data.user.acciones});*/

        setTimeout(() => {            
            navigate('/inicio');               
        },1200);
    };

    const clickIngresar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if ([credenciales.nickname, credenciales.password].includes('')) {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        setIsLoading(true);
        loadShow();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', credenciales)
            .then(handleSuccessLogin)
            .catch(handleErrorsLogin);
        });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredenciales({
            ...credenciales,
            [e.target.id]: e.target.value
        });        
    }
    
    const handleChangeRemember = (e: ChangeEvent<HTMLInputElement>) => {
        setCredenciales({
            ...credenciales,
            [e.target.id]: !credenciales.rememberme
        });
    }
    return (
        <div className="login">            
            <div className="wrapper wrapper-login wrapper-login-full p-0">                
                <div className="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-secondary-gradient">
                    <div className="bg-light mb-3 p-3 rounded">
                        <img src={logoDesarrollo} className="rounded img-fluid" alt="Logo Desarrollo Territorial" />
                    </div>
                    <h1 className="title fw-bold text-white mb-3">SUBSECRETARÍA DE ORDENAMIENTO TERRITORIAL Y AGRARIO</h1>
                    <p className="fs-5 fw-bolder text-white op-9">Dirección General de Concertación Agraria y Mediación</p>
                </div>
                <div className="login-aside w-50 d-flex align-items-center justify-content-center bg-white">
                    <div className="container container-login container-transparent animated fadeIn">
                        <h3 className="text-center">Inicie sesión para continuar</h3>
                        <div className="login-form">
                            <form onSubmit={clickIngresar}>
                                <div className="form-group">
                                    <label htmlFor="nickname"><b>Usuario</b></label>
                                    <input 
                                        id="nickname" 
                                        name="nickname" 
                                        type="text" 
                                        className="form-control" 
                                       
                                        value={credenciales.nickname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"><b>Contraseña</b></label>                                
                                    <div className="position-relative">
                                        <input 
                                            id="password" 
                                            name="password" 
                                            type="password" 
                                            className="form-control" 
                                            required 
                                            value={credenciales.password}
                                            onChange={handleChange}
                                        />
                                        <div className="show-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group form-action-d-flex mb-3">
                                    <div className="form-check">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input" 
                                            id="rememberme" 
                                            value={credenciales.rememberme}
                                            checked={credenciales.rememberme}
                                            onChange={handleChangeRemember}
                                        />
                                        <label className="custom-control-label m-0" htmlFor="rememberme">Recuérdame</label>
                                    </div>
                                    <input type='submit' value='Ingresar' className="btn btn-secondary col-md-5 float-end mt-3 mt-sm-0 fw-bold"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Loading texto={`Solicitando acceso, espere un momento.`}/>
        </div>
    )
}