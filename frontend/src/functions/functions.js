
export function perderVida(){
    var a =localStorage.getItem("lives")-1
    localStorage.setItem("lives",a)

}

export function naonao(vidasOtro){
    if (vidasOtro!=undefined) {
        vidasOtro-=1
    }
}

let timeoutPerderVida;

export function perderComponente(setLuzComponente){
    
    return new Promise((resolve, reject) => {
        setLuzComponente("/luzcomponente/apagado.png")
        clearTimeout(timeoutPerderVida);
        timeoutPerderVida = setTimeout(function () {
            let vida= localStorage.getItem("lives")-1
            localStorage.setItem("lives", vida)
            setLuzComponente("/luzcomponente/luz_roja.png")
            setTimeout(function () {
                setLuzComponente("/luzcomponente/apagado.png")
                resolve('luz')
            }, 1000);
        }, 200);
})}

export function ganarComponente(){}