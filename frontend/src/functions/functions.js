export function perderVida(){
    var a =localStorage.getItem("lives")-1
    localStorage.setItem("lives",a)

}

export function perderComponente(setLuzComponente){
    return new Promise((resolve, reject) => {
        setLuzComponente("/luzcomponente/apagado.png")
        setTimeout(function () {
            setLuzComponente("/luzcomponente/luz_roja.png")
            setTimeout(function () {
                setLuzComponente("/luzcomponente/apagado.png")
                resolve('luz')
            }, 1000);
        }, 200);
})}

export function ganarComponente(){}