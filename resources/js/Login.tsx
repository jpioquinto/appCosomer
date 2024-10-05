import '../css/app/plugins.min.css'
import '../css/app/kaiadmin.min.css'

export default function Login() {
    return (
        <div className="login">
            <div className="wrapper wrapper-login wrapper-login-full p-0">
                <div className="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-secondary-gradient">
                    <h1 className="title fw-bold text-white mb-3">SUBSECRETARÍA DE ORDENAMIENTO TERRITORIAL Y AGRARIO</h1>
                    <p className="subtitle text-white op-7">Dirección General de Concertación Agraria y Mediación</p>
                </div>
                <div className="login-aside w-50 d-flex align-items-center justify-content-center bg-white">
                    <div className="container container-login container-transparent animated fadeIn">
                        <h3 className="text-center">Inicie sesión para continuar</h3>
                        <div className="login-form">
                            <div className="form-group">
                                <label htmlFor="username"><b>Usuario</b></label>
                                <input id="username" name="username" type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><b>Contraseña</b></label>                                
                                <div className="position-relative">
                                    <input id="password" name="password" type="password" className="form-control" required />
                                    <div className="show-password">
                                        <i className="icon-eye"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-action-d-flex mb-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberme" />
                                    <label className="custom-control-label m-0" htmlFor="rememberme">Remember Me</label>
                                </div>
                                <a href="#" className="btn btn-secondary col-md-5 float-end mt-3 mt-sm-0 fw-bold">Ingresar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}